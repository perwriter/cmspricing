import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pricingTiers = await prisma.pricingTier.findMany();
    return NextResponse.json(pricingTiers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing tiers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pricingTier = await prisma.pricingTier.create({
      data: body,
    });
    return NextResponse.json(pricingTier);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing tier' }, { status: 500 });
  }
}