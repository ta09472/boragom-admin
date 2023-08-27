import prisma from "@/app/libs/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const post = await prisma.order.create({
      data: {
        ...body,
        status: "PAYMENT_COMPLETED",
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}

export async function GET() {
  const orders = await prisma.order.findMany();

  return NextResponse.json(orders);
}
