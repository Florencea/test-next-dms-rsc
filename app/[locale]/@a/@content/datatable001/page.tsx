import { getI18n } from "@/locales/server";
import { generateMeta } from "@/utils/server";
import { Metadata } from "next";
import { TableForm } from "./table-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return generateMeta(t("datatable001"));
}

export default function Page() {
  return (
    <div>
      <TableForm />
    </div>
  );
}
