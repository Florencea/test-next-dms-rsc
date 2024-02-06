"use server";

import {
  DEFAULT_PRIVATE_ROUTE,
  DataError,
  type ActionT,
} from "@/constants/constants";
import { errorHandler, getCurrentUser } from "@/data/auth";
import { prisma } from "@/prisma";
import { verify } from "argon2";
import { redirect } from "next/navigation";

export interface LoginT {
  account: string;
  password: string;
}

export const login: ActionT<LoginT> = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const account = formData.get("account")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
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
  redirect(DEFAULT_PRIVATE_ROUTE);
};
