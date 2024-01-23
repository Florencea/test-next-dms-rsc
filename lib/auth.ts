import { User } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const COOKIE_PASSWORD = "Kpgdq5fYdE&Sy#FjouDCWaa5mwrL8QNd";
const COOKIE_NAME = "tingarasec";

export const DEFAULT_PUBLIC_ROUTE = "/";
export const DEFAULT_PRIVATE_ROUTE = "/user";
export const getSession = () =>
  getIronSession<Partial<Pick<User, "id" | "account" | "name">>>(cookies(), {
    password: COOKIE_PASSWORD,
    cookieName: COOKIE_NAME,
  });
export const isLogin = async () => {
  const user = await getSession();
  return !!user?.id;
};
