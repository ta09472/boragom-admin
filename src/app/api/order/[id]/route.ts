import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

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
