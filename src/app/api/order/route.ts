import prisma from "@/app/libs/prisma";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const post = await prisma.order.create({
      data: {
        ...body,
        status: "PAYMENT_COMPLETED",
      },
    });

    revalidatePath(`${baseURL}/api/order`);

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}

export async function GET() {
  const orders = await prisma.order.findMany();

  return NextResponse.json(orders);
}
