import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/prisma/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Sex } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(session.user);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, name, age, sex, bodyWeight, diseases } = data;
    
    if (id !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (age !== undefined && (typeof age !== "number" || age < 1 || age > 120)) {
      return NextResponse.json({ error: "Age must be between 1 and 120" }, { status: 400 });
    }

    if (bodyWeight !== undefined && (typeof bodyWeight !== "number" || bodyWeight < 1 || bodyWeight > 500)) {
      return NextResponse.json({ error: "Body weight must be between 1 and 500 kg" }, { status: 400 });
    }

    if (sex !== undefined && !["MALE", "FEMALE", "OTHER"].includes(sex)) {
      return NextResponse.json({ error: "Invalid sex value" }, { status: 400 });
    }

    if (diseases !== undefined && !Array.isArray(diseases)) {
      return NextResponse.json({ error: "Diseases must be an array" }, { status: 400 });
    }

    const updateData: {
      name: string;
      updatedAt: Date;
      age?: number;
      sex?: Sex | null;
      bodyWeight?: number;
      diseases?: string[];
    } = {
      name: name.trim(),
      updatedAt: new Date(),
    };

    if (age !== undefined) updateData.age = age;
    if (sex !== undefined) updateData.sex = sex as Sex;
    if (bodyWeight !== undefined) updateData.bodyWeight = bodyWeight;
    if (diseases !== undefined) updateData.diseases = diseases;
  
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}