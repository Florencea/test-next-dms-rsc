import { getSession } from "@/lib/auth";
import Link from "next/link";
import { LogoutForm } from "./logout-form";

export default async function Default() {
  const user = await getSession();
  return (
    <div>
      <Link href="/user">User</Link>
      <Link href="/star">Star</Link>
      <Link href="/fish">Fish</Link>
      User: {user.name}
      <LogoutForm />
    </div>
  );
}
