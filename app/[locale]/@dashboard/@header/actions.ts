"use server";

import { type ActionT } from "@/constants/data";
import { DEFAULT_PUBLIC_ROUTE } from "@/constants/route";
import { errorHandler, getCurrentUser } from "@/data/auth";
import { getServerPath } from "@/utils/server";
import { redirect } from "next/navigation";

export const logout: ActionT = async () => {
  try {
    const user = await getCurrentUser();
    user.destroy();
  } catch (err) {
    return errorHandler(err);
  }
  redirect(getServerPath(DEFAULT_PUBLIC_ROUTE));
};
