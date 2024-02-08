"use server";

import { COOKIE_NAME, COOKIE_PASSWORD } from "@/constants/auth";
import { DataError } from "@/constants/data";
import { DEFAULT_PRIVATE_ROUTE } from "@/constants/route";
import { prisma } from "@/prisma";
import type { User } from "@prisma/client";
import { verify } from "argon2";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ZodError, z } from "zod";
import { convertZodError } from "./zod";

export const getCurrentUser = cache(async () => {
  const user = getIronSession<Partial<Pick<User, "id" | "account" | "name">>>(
    cookies(),
    {
      password: COOKIE_PASSWORD,
      cookieName: COOKIE_NAME,
    },
  );
  return user;
});

export const isLogin = async () => {
  const user = await getCurrentUser();
  return !!user?.id;
};

export const errorHandler = async (err: unknown) => {
  if (err instanceof DataError) return err.toMessage();
  if (err instanceof ZodError)
    return new DataError({
      message: err.errors
        .map(({ path, message }) => `${path}: ${message}`)
        .join(", "),
      status: "BAD_REQUEST",
      zodError: err,
      fieldData: await convertZodError(err),
    }).toMessage();
  return new DataError({
    message: "Server error",
    status: "SERVER_ERROR",
  }).toMessage();
};

export const checkIsLogin = async () => {
  if (!(await isLogin()))
    throw new DataError({
      message: "Please login first",
      status: "UNAUTHORIZED",
    });
};

const loginSchema = z
  .object({
    account: z.string().startsWith("aida"),
    password: z.string(),
  })
  .required();

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const login = async (prevState: unknown, formData: FormData) => {
  try {
    const { account, password } = loginSchema.parse(
      Object.fromEntries(formData.entries()),
    );
    await delay(5000);

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
    console.log(err);
    return errorHandler(err);
  }
  redirect(DEFAULT_PRIVATE_ROUTE);
};
