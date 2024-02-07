import { DEFAULT_PRIVATE_ROUTE } from "@/constants/route";
import { getServerPath } from "@/utils/server";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(getServerPath(DEFAULT_PRIVATE_ROUTE));
}
