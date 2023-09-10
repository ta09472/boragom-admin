import prisma from "@/app/libs/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const orders = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(orders);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const order = await prisma.order.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(order);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const { status } = await request.json();

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json({ response: order });
}
