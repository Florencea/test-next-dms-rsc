import { DataError } from "@/constants/data";
import { isLogin } from "@/data/auth";
import { prisma } from "@/prisma";
import { getServerPath } from "@/utils/server";
import { generateMeta } from "@/utils/site";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { View } from "./view";

export const metadata: Metadata = generateMeta("查看魚類");

const getItem = async (id: string) => {
  try {
    if (!(await isLogin()))
      throw new DataError({
        message: "Please login first",
        status: "UNAUTHORIZED",
      });

    const item = await prisma.fish.findUnique({ where: { id } });
    return item ?? undefined;
  } catch (err) {
    if (err instanceof DataError && err.status === "UNAUTHORIZED")
      redirect(getServerPath("/datatable001"));
    return undefined;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getItem(id);
  return <div>{item ? <View item={item} /> : "魚類不存在"}</div>;
}
