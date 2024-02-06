"use server";

import { COOKIE_NAME, COOKIE_PASSWORD } from "@/constants/constants";
import type { User } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { cache } from "react";

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
