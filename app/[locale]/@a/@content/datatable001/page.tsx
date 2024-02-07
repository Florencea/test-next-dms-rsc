import { checkIsLogin, errorHandler } from "@/data/auth";
import { getI18n } from "@/locales/server";
import { prisma } from "@/prisma";
import { generateMeta } from "@/utils/server";
import type { Datatable001 } from "@prisma/client";
import dayjs from "dayjs";
import { Metadata } from "next";
import { z } from "zod";
import { TableForm } from "./table-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return generateMeta(t("datatable001"));
}

const searchParamsSchema = z.object({
  stringColumn1: z.coerce.string().default(""),
  stringColumn2: z.coerce.string().default(""),
  start: z.coerce.string().default("1900-01-01"),
  end: z.coerce.string().default("2999-12-31"),
  current: z.coerce.number().int().default(1),
  pageSize: z.coerce.number().int().default(10),
});

type Datatable001SearchParamsT = z.infer<typeof searchParamsSchema>;

type Datatable001RecordT = Pick<
  Datatable001,
  "id" | "stringColumn1" | "stringColumn2" | "createdAt"
>;

const getList = async (params: Datatable001SearchParamsT) => {
  try {
    await checkIsLogin();

    const { stringColumn1, stringColumn2, start, end, current, pageSize } =
      params;

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
    return { list, total };
  } catch (err) {
    errorHandler(err);
  }
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = searchParamsSchema.parse(searchParams);
  const data = await getList(params);
  return (
    <div>
      <TableForm data={data} />
    </div>
  );
}
