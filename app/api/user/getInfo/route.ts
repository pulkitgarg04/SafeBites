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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        isSubscribed: true,
        profileComplete: true,
        allergens: true,
        customAllergens: true,
        age: true,
        sex: true,
        bodyWeight: true,
        diseases: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}