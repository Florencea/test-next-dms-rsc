import { DEFAULT_PRIVATE_ROUTE } from "@/constants/constants";
import { isLogin } from "@/data/auth";
import { redirect } from "next/navigation";

export default async function Default() {
  if (await isLogin()) {
    redirect(DEFAULT_PRIVATE_ROUTE);
  }
  return null;
}
