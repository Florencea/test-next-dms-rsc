import { PrismaClient } from "@prisma/client";
import { userCreateExtension } from "./extensions";

const prismaClientSingleton = () => {
  return new PrismaClient({ errorFormat: "minimal" }).$extends(
    userCreateExtension(),
  );
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
