"use server";

import { type ActionT } from "@/constants/data";
import { checkIsLogin, errorHandler } from "@/data/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const datatable001EditSchema = z
  .object({
    id: z.string(),
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

export type Datatable001EditT = z.infer<typeof datatable001EditSchema>;

export const edit: ActionT<{}> = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    await checkIsLogin();

    const { id, ...data } = datatable001EditSchema.parse(
      Object.fromEntries(formData.entries()),
    );
    await prisma.datatable001.update({ where: { id }, data });
    revalidatePath("/datatable001");
    return { status: "OK", message: "Data Saved" };
  } catch (err) {
    return errorHandler(err);
  }
};
