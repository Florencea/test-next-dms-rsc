import { DEFAULT_PRIVATE_ROUTE, isLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Default() {
  if (isLogin) {
    redirect(DEFAULT_PRIVATE_ROUTE);
  }
  return null;
}
