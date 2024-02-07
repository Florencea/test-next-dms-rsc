import { getI18n } from "@/locales/server";
import { prisma } from "@/prisma";
import { generateMeta } from "@/utils/server";
import { Metadata } from "next";
import { CreateForm } from "./create-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return generateMeta(`${t("create")} - ${t("datatable001")}`);
}

const getDatatabel002Options = async () => {
  const datatable002Items = await prisma.datatable002.findMany({
    select: { id: true, stringColumn: true },
  });
  return datatable002Items.map(({ id, stringColumn }) => ({
    label: stringColumn,
    value: id,
  }));
};

export default async function Page() {
  const datatable002Options = await getDatatabel002Options();
  return (
    <div className="flex w-full">
      <CreateForm options={{ datatable002: datatable002Options }} />
    </div>
  );
}
