"use server";

import { DEFAULT_PUBLIC_ROUTE, type ActionT } from "@/constants/constants";
import { errorHandler, getCurrentUser } from "@/data/auth";
import { redirect } from "next/navigation";

export const logout: ActionT = async () => {
  try {
    const user = await getCurrentUser();
    user.destroy();
  } catch (err) {
    return errorHandler(err);
  }
  redirect(DEFAULT_PUBLIC_ROUTE);
};
