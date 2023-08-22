import prisma from "@/app/libs/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await prisma.user.create({
    data: {
      name: "33333",
      email: "3333@email.com",
    },
  });

  return NextResponse.json(user);
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
