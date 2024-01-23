import { DEFAULT_PUBLIC_ROUTE, isLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Default() {
  if (!isLogin) {
    redirect(DEFAULT_PUBLIC_ROUTE);
  }
  return null;
}
