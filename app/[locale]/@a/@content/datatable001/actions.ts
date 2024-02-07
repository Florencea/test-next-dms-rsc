"use server";

import { type ActionT, type ListT } from "@/constants/data";
import { checkIsLogin, errorHandler } from "@/data/auth";
import { prisma } from "@/prisma";
import type { Datatable001 } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

const searchParamsSchema = z.object({
  stringColumn1: z.coerce.string().default(""),
  stringColumn2: z.coerce.string().default(""),
  start: z.coerce.string().default("1900-01-01"),
  end: z.coerce.string().default("2999-12-31"),
  current: z.coerce.number().int().default(1),
  pageSize: z.coerce.number().int().default(10),
});

export type Datatable001SearchParamsT = z.infer<typeof searchParamsSchema> & {
  period: [Dayjs, Dayjs];
};

export type Datatable001RecordT = Pick<
  Datatable001,
  "id" | "stringColumn1" | "stringColumn2" | "createdAt"
>;

export const getList: ActionT<ListT<Datatable001RecordT>> = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    await checkIsLogin();

    const { stringColumn1, stringColumn2, start, end, current, pageSize } =
      searchParamsSchema.parse(Object.fromEntries(formData.entries()));

    const total = await prisma.datatable001.count({
      where: {
        stringColumn1: {
          contains: stringColumn1,
        },
        stringColumn2: {
          contains: stringColumn2,
        },
        createdAt: {
          gte: dayjs(start).startOf("day").toDate(),
          lte: dayjs(end).endOf("day").toDate(),
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
          gte: dayjs(start).startOf("day").toDate(),
          lte: dayjs(end).endOf("day").toDate(),
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

const removeSchema = z.object({
  id: z.coerce.string(),
});

export const remove: ActionT = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    await checkIsLogin();

    const { id } = removeSchema.parse(Object.fromEntries(formData.entries()));

    await prisma.datatable001.delete({ where: { id } });

    return { status: "OK" };
  } catch (err) {
    return errorHandler(err);
  }
};
