import { DEFAULT_PRIVATE_ROUTE, getSession } from "@/lib/auth";
import { prisma } from "@/prisma";
import { verify } from "argon2";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login - Tingara DMS",
};

export default function Page() {
  const login = async (formData: FormData) => {
    "use server";
    const account = formData.get("account")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const user = await prisma.user.findUnique({ where: { account } });
    if (user) {
      const match = await verify(user.password, password);
      if (match) {
        const session = await getSession();
        session.id = user.id;
        session.account = user.account;
        session.name = user.name;
        await session.save();
        redirect(DEFAULT_PRIVATE_ROUTE);
      }
    }
  };

  return (
    <div>
      <form action={login}>
        <label htmlFor="account">
          <input className="border" type="text" name="account" id="account" />
        </label>
        <label htmlFor="password">
          <input
            className="border"
            type="password"
            name="password"
            id="password"
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
