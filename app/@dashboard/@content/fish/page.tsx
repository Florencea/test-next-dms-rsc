import { Metadata } from "next";
import { TableForm } from "./table-form";

export const metadata: Metadata = {
  title: "魚類管理 - Tingara DMS",
};

export default function Page() {
  return (
    <div>
      <TableForm />
    </div>
  );
}
