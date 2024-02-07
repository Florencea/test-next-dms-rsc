import { DEFAULT_PUBLIC_ROUTE } from "@/constants/route";
import { isLogin } from "@/data/auth";
import { getServerPath } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function Default() {
  if (!(await isLogin())) {
    redirect(getServerPath(DEFAULT_PUBLIC_ROUTE));
  }
  return null;
}
