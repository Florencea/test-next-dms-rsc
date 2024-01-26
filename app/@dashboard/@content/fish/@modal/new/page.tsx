import { Metadata } from "next";
import { Modal } from "./modal";

export const metadata: Metadata = {
  title: "新增魚類 - Tingara DMS",
};

export default function Page() {
  return <Modal />;
}
