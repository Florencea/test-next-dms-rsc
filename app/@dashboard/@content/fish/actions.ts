"use server";

import { DataError, type ActionT } from "@/constants/constants";
import { errorHandler, isLogin } from "@/data/auth";
import { prisma } from "@/prisma";
import type { Fish } from "@prisma/client";
import type { Dayjs } from "dayjs";

export interface FishSearchParamsT {
  name: string;
  col1: string;
  period: [Dayjs, Dayjs];
  start: string;
  end: string;
}

export type FishRecordT = Pick<Fish, "id" | "name" | "col1" | "createdAt">;

export const getList: ActionT<FishRecordT[]> = async (
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
    const start = formData.get("start")?.toString() ?? "1900-01-01";
    const end = formData.get("end")?.toString() ?? "2999-12-31";

    const list = await prisma.fish.findMany({
      where: {
        name: {
          contains: name,
        },
        col1: {
          contains: col1,
        },
        createdAt: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      select: {
        id: true,
        name: true,
        col1: true,
        createdAt: true,
      },
    });

    return { data: list, status: "OK", message: "OK" };
  } catch (err) {
    return errorHandler(err);
  }
};

export const remove: ActionT = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    if (!(await isLogin()))
      throw new DataError({
        message: "Please login first",
        status: "UNAUTHORIZED",
      });

    const id = formData.get("id")?.toString() ?? "";

    await prisma.fish.delete({ where: { id } });

    return { status: "OK", message: "OK" };
  } catch (err) {
    return errorHandler(err);
  }
};
