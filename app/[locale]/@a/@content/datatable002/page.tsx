import { getI18n } from "@/locales/server";
import { generateMeta } from "@/utils/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return generateMeta(t("datatable002"));
}
export default function Page() {
  return (
    <div>
      <p>star</p>
    </div>
  );
}
