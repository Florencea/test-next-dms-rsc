import { prisma } from "@/prisma";

export const getFishData = async () => {
  const data = await prisma.fish.findMany();
  return data;
};
