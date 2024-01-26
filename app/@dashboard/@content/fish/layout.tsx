import { ReactNode } from "react";

export default async function Layout({
  table,
  modal,
}: Readonly<{
  table: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <div>
      {table}
      {modal}
    </div>
  );
}
