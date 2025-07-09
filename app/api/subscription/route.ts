import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany();
    return NextResponse.json(subscriptions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const subscription = await prisma.subscription.create({ data });
    return NextResponse.json(subscription);
  } catch {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    const subscription = await prisma.subscription.update({ where: { id }, data: updateData });
    return NextResponse.json(subscription);
  } catch {
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.subscription.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 });
  }
} 