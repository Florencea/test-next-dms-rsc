"use server";

import { DataError, type ActionT } from "@/constants/constants";
import { errorHandler, isLogin } from "@/data/auth";
import { prisma } from "@/prisma";
import type { Fish } from "@prisma/client";
import { redirect } from "next/navigation";

export type FishCreateT = Pick<
  Fish,
  "name" | "col1" | "col2" | "col3" | "col4" | "col5"
>;

export const create: ActionT<{}> = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    if (!(await isLogin()))
      throw new DataError({
        message: "Please login first",
        status: "UNAUTHORIZED",
      });

    const name = formData.get("name")?.toString() ?? "";
    const col1 = formData.get("col1")?.toString() ?? "";
    const col2 = parseFloat(formData.get("col2")?.toString() ?? "") ?? 0;
    const col3 = formData.get("col3")?.toString() ?? "";
    const col4 = formData.get("col4")?.toString() ?? "";
    const col5 = formData.get("col5")?.toString() ?? "";

    await prisma.fish.create({ data: { name, col1, col2, col3, col4, col5 } });
  } catch (err) {
    return errorHandler(err);
  }
  redirect("/fish");
};
