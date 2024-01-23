import { DEFAULT_PRIVATE_ROUTE, isLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Default() {
  if (await isLogin()) {
    redirect(DEFAULT_PRIVATE_ROUTE);
  }
  return null;
}
