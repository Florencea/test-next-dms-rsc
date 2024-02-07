import { DEFAULT_PRIVATE_ROUTE } from "@/constants/route";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(DEFAULT_PRIVATE_ROUTE);
}
