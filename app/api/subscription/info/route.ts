import { auth } from "@/lib/auth";
import { PrismaClient } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { userId: session.user.id },
    });

    if (!subscription) {
      return new Response(JSON.stringify({ error: "No subscription found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(subscription), { status: 200 });
  } catch (error) {
    console.error("Error subscription info:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}