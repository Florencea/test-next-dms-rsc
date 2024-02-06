import { Metadata } from "next";
import { CreateForm } from "./create-form";

export const metadata: Metadata = {
  title: "新增魚類 - Tingara DMS",
};

export default function Page() {
  return (
    <div>
      <CreateForm />
    </div>
  );
}
