import { COOKIE_NAME, COOKIE_PASSWORD } from "@/constants/constants";
import { User } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = () =>
  getIronSession<Partial<Pick<User, "id" | "account" | "name">>>(cookies(), {
    password: COOKIE_PASSWORD,
    cookieName: COOKIE_NAME,
  });
export const isLogin = async () => {
  const user = await getSession();
  return !!user?.id;
};
