import { generateMeta } from "@/utils/site";
import { Metadata } from "next";
import { TableForm } from "./table-form";

export const metadata: Metadata = generateMeta("魚類管理");

export default function Page() {
  return (
    <div>
      <TableForm />
    </div>
  );
}
