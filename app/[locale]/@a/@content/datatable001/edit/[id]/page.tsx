import { checkIsLogin, errorHandler } from "@/data/auth";
import { getI18n } from "@/locales/server";
import { prisma } from "@/prisma";
import { generateMeta } from "@/utils/server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Edit } from "./edit-form";

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

const getDatatabel002Options = async () => {
  const datatable002Items = await prisma.datatable002.findMany({
    select: { id: true, stringColumn: true },
  });
  return datatable002Items.map(({ id, stringColumn }) => ({
    label: stringColumn,
    value: id,
  }));
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getItem(id);
  const datatable002Options = await getDatatabel002Options();
  if (item) {
    return (
      <div className="flex w-full">
        <AntdRegistry>
          <Edit item={item} options={{ datatable002: datatable002Options }} />
        </AntdRegistry>
      </div>
    );
  } else {
    redirect("/datatable001");
  }
}
