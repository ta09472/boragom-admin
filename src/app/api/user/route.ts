import prisma from "@/app/libs/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const user = await prisma.user.create({
    data: {
      name: "33333",
      email: "3333@email.com",
    },
  });

  revalidatePath("http://localhost:3000/api/user");
  return NextResponse.json(user);
}

export async function GET(req, res) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
