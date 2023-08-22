"use server";

import prisma from "@/app/libs/prisma";
import { revalidatePath } from "next/cache";

const create = async () => {
  const user = await prisma.user.create({
    data: {
      name: "my-test244sd1",
      email: "mymy2441sd@email.com",
    },
  });

  revalidatePath("http://localhost:3000/api/user");
};

export default create;
