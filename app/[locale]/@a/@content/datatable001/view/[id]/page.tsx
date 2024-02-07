import { checkIsLogin, errorHandler } from "@/data/auth";
import { getI18n } from "@/locales/server";
import { prisma } from "@/prisma";
import { generateMeta } from "@/utils/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { View } from "./view";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const item = await getItem(id);
  const t = await getI18n();
  return item
    ? generateMeta(`${item.stringColumn1} - ${t("datatable001")}`)
    : generateMeta(t("datatable001"));
}

const getItem = async (id: string) => {
  try {
    await checkIsLogin();

    const item = await prisma.datatable001.findUnique({ where: { id } });
    return item ?? undefined;
  } catch (err) {
    errorHandler(err);
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getItem(id);
  if (item) {
    return (
      <div>
        <View item={item} />
      </div>
    );
  } else {
    redirect("/datatable001");
  }
}
