import crypto from "crypto";
import { PrismaClient } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    if (eventType === "order_created") {
      const userId: string = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";

      if(isSuccessful) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (!user) {
          throw new Error(`User with ID ${userId} not found.`);
        }

        await prisma.subscription.upsert({
          where: { id: userId },
          create: {
            userId,
            credits: 100,
            creditsUsed: 0,
            purchaseDate: new Date(),
          },
          update: {
            credits: 100,
            creditsUsed: 0,
            purchaseDate: new Date(),
            updatedAt: new Date(),
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { isSubscribed: true },
        });

        console.log(`Subscription created for user ${userId}`);
      }
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}