import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await prisma.user.create({ data });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    const user = await prisma.user.update({ where: { id }, data: updateData });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
} 