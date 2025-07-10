import { NextRequest, NextResponse } from "next/server";
import { lemonSqueezyApiInstance } from "@/utils/lemonsqueezy";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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