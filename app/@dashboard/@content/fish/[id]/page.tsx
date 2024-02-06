import { DataError } from "@/constants/constants";
import { isLogin } from "@/data/auth";
import { prisma } from "@/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { View } from "./view";

export const metadata: Metadata = {
  title: "查看魚類 - Tingara DMS",
};

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
      redirect("/fish");
    return undefined;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getItem(id);
  return <div>{item ? <View item={item} /> : "魚類不存在"}</div>;
}