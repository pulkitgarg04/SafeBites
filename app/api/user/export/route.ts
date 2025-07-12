import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!userData) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        emailVerified: userData.emailVerified,
        image: userData.image,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        isSubscribed: userData.isSubscribed,
        profileComplete: userData.profileComplete,
        allergens: userData.allergens,
        customAllergens: userData.customAllergens,
        age: userData.age,
        sex: userData.sex,
        bodyWeight: userData.bodyWeight,
        diseases: userData.diseases,
      },
      subscription: userData.subscriptions[0] ? {
        id: userData.subscriptions[0].id,
        credits: userData.subscriptions[0].credits,
        creditsUsed: userData.subscriptions[0].creditsUsed,
        purchaseDate: userData.subscriptions[0].purchaseDate,
        createdAt: userData.subscriptions[0].createdAt,
        updatedAt: userData.subscriptions[0].updatedAt,
      } : null,
      exportInfo: {
        generatedAt: new Date().toISOString(),
        dataVersion: "1.0",
        description: "SafeBites user data export",
      }
    };

    const jsonData = JSON.stringify(exportData, null, 2);

    return new Response(jsonData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="safebites-user-data-${userData.id}-${new Date().toISOString().split('T')[0]}.json"`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error("Error exporting user data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
