"use server";

import {
  DEFAULT_PUBLIC_ROUTE,
  DataError,
  type ActionT,
} from "@/constants/constants";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const logout: ActionT = async () => {
  try {
    const user = await getSession();
    user.destroy();
  } catch (err) {
    if (err instanceof DataError) return err.toMessage();
    return new DataError({
      message: "Server error",
      status: "SERVER_ERROR",
    }).toMessage();
  }
  redirect(DEFAULT_PUBLIC_ROUTE);
};
