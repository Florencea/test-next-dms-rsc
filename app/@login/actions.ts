"use server";

import {
  DEFAULT_PRIVATE_ROUTE,
  DataError,
  type ActionT,
} from "@/constants/constants";
import { getSession } from "@/lib/auth";
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

    const session = await getSession();
    session.id = user.id;
    session.account = user.account;
    session.name = user.name;
    await session.save();
  } catch (err) {
    if (err instanceof DataError) return err.toMessage();
    return new DataError({
      message: "Server error",
      status: "SERVER_ERROR",
    }).toMessage();
  }
  redirect(DEFAULT_PRIVATE_ROUTE);
};
