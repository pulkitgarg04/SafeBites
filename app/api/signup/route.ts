import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  
  try {
    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name
        }
    })

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
