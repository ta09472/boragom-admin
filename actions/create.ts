"use server";

import prisma from "@/app/libs/prisma";

const create = async () => {
  const user = await prisma.user.create({
    data: {
      name: "my-test244sd1",
      email: "mymy2441sd@email.com",
    },
  });
};

export default create;
