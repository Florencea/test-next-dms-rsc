import { DEFAULT_PUBLIC_ROUTE, getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Default() {
  const user = await getSession();
  const logout = async () => {
    "use server";
    const user = await getSession();
    user.destroy();
    redirect(DEFAULT_PUBLIC_ROUTE);
  };
  return (
    <div>
      <Link href="/user">User</Link>
      <Link href="/star">Star</Link>
      <Link href="/fish">Fish</Link>
      User: {user.name}
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
