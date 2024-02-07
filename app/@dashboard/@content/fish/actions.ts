"use server";

import { DataError, type ActionT } from "@/constants/data";
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
  current: number;
  pageSize: number;
}

export type FishRecordT = Pick<Fish, "id" | "name" | "col1" | "createdAt">;

export const getList: ActionT<{ list: FishRecordT[]; total: number }> = async (
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
    const current = Number(formData.get("current")?.toString() ?? "1");
    const pageSize = Number(formData.get("pageSize")?.toString() ?? "10");

    const total = await prisma.fish.count({
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
    });
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
      take: pageSize,
      skip: (current - 1) * pageSize,
    });

    return { data: { list, total }, status: "OK", message: "OK" };
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

    return { status: "OK", message: "" };
  } catch (err) {
    return errorHandler(err);
  }
};
