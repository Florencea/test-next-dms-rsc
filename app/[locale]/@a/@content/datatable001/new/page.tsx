import { generateMeta } from "@/utils/site";
import { Metadata } from "next";
import { CreateForm } from "./create-form";

export const metadata: Metadata = generateMeta("新增魚類");

export default function Page() {
  return (
    <div>
      <CreateForm />
    </div>
  );
}
