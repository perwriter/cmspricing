import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pricingTier = await prisma.pricingTier.findUnique({
      where: { id: params.id },
    });
    return NextResponse.json(pricingTier);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing tier' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const pricingTier = await prisma.pricingTier.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(pricingTier);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing tier' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pricingTier.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Pricing tier deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete pricing tier' }, { status: 500 });
  }
}