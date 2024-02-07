"use server";

import { COOKIE_NAME, COOKIE_PASSWORD } from "@/constants/auth";
import { DataError } from "@/constants/data";
import type { User } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { cache } from "react";
import { ZodError } from "zod";

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

export const errorHandler = (err: unknown) => {
  if (err instanceof DataError) return err.toMessage();
  if (err instanceof ZodError)
    return new DataError({
      message: err.errors
        .map(({ path, message }) => `${path}: ${message}`)
        .join(", "),
      status: "BAD_REQUEST",
    }).toMessage();
  return new DataError({
    message: "Server error",
    status: "SERVER_ERROR",
  }).toMessage();
};
