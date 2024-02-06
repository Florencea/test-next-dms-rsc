import { DEFAULT_PRIVATE_ROUTE } from "@/constants/constants";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(DEFAULT_PRIVATE_ROUTE);
}
