import { DEFAULT_PUBLIC_ROUTE } from "@/constants/constants";
import { isLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Default() {
  if (!(await isLogin())) {
    redirect(DEFAULT_PUBLIC_ROUTE);
  }
  return null;
}
