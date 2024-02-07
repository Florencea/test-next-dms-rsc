"use server";

import { DataError, type ActionT } from "@/constants/data";
import { errorHandler, isLogin } from "@/data/auth";
import { prisma } from "@/prisma";
import type { Datatable001 } from "@prisma/client";
import type { Dayjs } from "dayjs";

export interface Datatable001SearchParamsT {
  stringColumn1: string;
  stringColumn2: string;
  period: [Dayjs, Dayjs];
  start: string;
  end: string;
  current: number;
  pageSize: number;
}

export type Datatable001RecordT = Pick<
  Datatable001,
  "id" | "stringColumn1" | "stringColumn2" | "createdAt"
>;

export const getList: ActionT<{
  list: Datatable001RecordT[];
  total: number;
}> = async (prevState: unknown, formData: FormData) => {
  try {
    if (!(await isLogin()))
      throw new DataError({
        message: "Please login first",
        status: "UNAUTHORIZED",
      });

    const stringColumn1 = formData.get("stringColumn1")?.toString() ?? "";
    const stringColumn2 = formData.get("stringColumn2")?.toString() ?? "";
    const start = formData.get("start")?.toString() ?? "1900-01-01";
    const end = formData.get("end")?.toString() ?? "2999-12-31";
    const current = Number(formData.get("current")?.toString() ?? "1");
    const pageSize = Number(formData.get("pageSize")?.toString() ?? "10");

    const total = await prisma.datatable001.count({
      where: {
        stringColumn1: {
          contains: stringColumn1,
        },
        stringColumn2: {
          contains: stringColumn2,
        },
        createdAt: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
    });
    const list = await prisma.datatable001.findMany({
      where: {
        stringColumn1: {
          contains: stringColumn1,
        },
        stringColumn2: {
          contains: stringColumn2,
        },
        createdAt: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      select: {
        id: true,
        stringColumn1: true,
        stringColumn2: true,
        createdAt: true,
      },
      take: pageSize,
      skip: (current - 1) * pageSize,
    });

    return { data: { list, total }, status: "OK" };
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

    await prisma.datatable001.delete({ where: { id } });

    return { status: "OK" };
  } catch (err) {
    return errorHandler(err);
  }
};
