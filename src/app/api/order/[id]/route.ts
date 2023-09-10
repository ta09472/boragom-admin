import prisma from "@/app/libs/prisma";
import { TReservation } from "@/types/model/order/type";
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

  const body = await request.json();
  const prev = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  const newVal: TReservation = {
    ...prev,
    ...body,
  };

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: newVal,
  });

  return NextResponse.json({ response: order });
}
