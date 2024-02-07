"use server";

import { DataError, type ActionT } from "@/constants/data";
import { errorHandler, isLogin } from "@/data/auth";
import { prisma } from "@/prisma";
import { getServerPath } from "@/utils/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const datatable001CreateSchema = z
  .object({
    stringColumn1: z.coerce.string(),
    stringColumn2: z.coerce.string(),
    stringColumn3: z.coerce.string(),
    stringColumn4: z.coerce.string(),
    stringColumn5: z.coerce.string(),
    floatColumn1: z.coerce.number(),
    floatColumn2: z.coerce.number(),
    floatColumn3: z.coerce.number(),
    floatColumn4: z.coerce.number(),
    floatColumn5: z.coerce.number(),
    integerColumn1: z.coerce.number().int(),
    integerColumn2: z.coerce.number().int(),
    integerColumn3: z.coerce.number().int(),
    integerColumn4: z.coerce.number().int(),
    integerColumn5: z.coerce.number().int(),
    booleanColumn1: z.coerce.boolean(),
    booleanColumn2: z.coerce.boolean(),
    booleanColumn3: z.coerce.boolean(),
    booleanColumn4: z.coerce.boolean(),
    booleanColumn5: z.coerce.boolean(),
    datatable002Id: z.coerce.string(),
  })
  .required();

export type Datatable001CreateT = z.infer<typeof datatable001CreateSchema>;

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

    const data = datatable001CreateSchema.parse(
      Object.fromEntries(formData.entries()),
    );
    await prisma.datatable001.create({ data });
  } catch (err) {
    return errorHandler(err);
  }
  redirect(getServerPath("/datatable001"));
};
