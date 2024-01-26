"use server";

import { DEFAULT_PRIVATE_ROUTE, getSession } from "@/lib/auth";
import { prisma } from "@/prisma";
import { verify } from "argon2";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  try {
    const account = formData.get("account")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const user = await prisma.user.findUnique({ where: { account } });

    if (!user) throw new Error("User not found");

    const match = await verify(user.password, password);

    if (!match) throw new Error("Wrong password");

    const session = await getSession();
    session.id = user.id;
    session.account = user.account;
    session.name = user.name;
    await session.save();
  } catch (err) {
    if (err instanceof Error) return { message: err.message };
    return { message: "Server error" };
  }
  redirect(DEFAULT_PRIVATE_ROUTE);
}
