"use server";

import { DataError, type ActionT } from "@/constants/data";
import { DEFAULT_PRIVATE_ROUTE } from "@/constants/route";
import { errorHandler, getCurrentUser } from "@/data/auth";
import { prisma } from "@/prisma";
import { getServerPath } from "@/utils/server";
import { verify } from "argon2";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z
  .object({
    account: z.coerce.string(),
    password: z.coerce.string(),
  })
  .required();

export type LoginT = z.infer<typeof loginSchema>;

export const login: ActionT<{}> = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const { account, password } = loginSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    const user = await prisma.user.findUnique({ where: { account } });

    if (!user)
      throw new DataError({
        status: "UNAUTHORIZED",
        message: "User not found",
      });

    const match = await verify(user.password, password);

    if (!match)
      throw new DataError({
        status: "UNAUTHORIZED",
        message: "Wrong password",
      });

    const session = await getCurrentUser();
    session.id = user.id;
    session.account = user.account;
    session.name = user.name;
    await session.save();
  } catch (err) {
    return errorHandler(err);
  }
  redirect(getServerPath(DEFAULT_PRIVATE_ROUTE));
};
