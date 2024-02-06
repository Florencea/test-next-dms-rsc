import { MENU_WIDTH } from "@/constants/theme";
import { ReactNode } from "react";

export default async function Layout({
  header,
  menu,
  content,
}: Readonly<{
  header: ReactNode;
  menu: ReactNode;
  content: ReactNode;
}>) {
  return (
    <div className="flex h-svh w-full flex-col bg-gray-50">
      <header>{header}</header>
      <div className="flex grow">
        {menu}
        <main className="p-3" style={{ marginLeft: MENU_WIDTH }}>
          {content}
        </main>
      </div>
    </div>
  );
}
