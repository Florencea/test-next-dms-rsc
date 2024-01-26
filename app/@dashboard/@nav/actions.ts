"use server";

import { DEFAULT_PUBLIC_ROUTE, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logout() {
  const user = await getSession();
  user.destroy();
  redirect(DEFAULT_PUBLIC_ROUTE);
}
