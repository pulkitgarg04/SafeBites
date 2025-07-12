import { NextRequest, NextResponse } from "next/server";
import { lemonSqueezyApiInstance } from "@/utils/lemonsqueezy";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const data = await req.json();

    if (!data.productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      );
    }

    const response = await lemonSqueezyApiInstance.post('/checkouts', {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: session?.user.id,
            }
          }
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString()
            }
          },
          variant: {
            data: {
              type: "variants",
              id: data.productId.toString()
            }
          }
        }
      }
    });

    const checkoutUrl = response.data.data.attributes.url;

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, creditsUsed } = data;

    if (!id || typeof creditsUsed !== "number") {
      return NextResponse.json(
        { error: "id and creditsUsed are required" },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.findFirst({
      where: { userId: id },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.subscription.update({
      where: { id: subscription.id },
      data: { creditsUsed: subscription.creditsUsed + creditsUsed },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}