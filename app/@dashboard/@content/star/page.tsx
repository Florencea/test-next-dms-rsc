import { generateMeta } from "@/utils/site";
import { Metadata } from "next";

export const metadata: Metadata = generateMeta("星星管理");

export default function Page() {
  return (
    <div>
      <p>star</p>
    </div>
  );
}
