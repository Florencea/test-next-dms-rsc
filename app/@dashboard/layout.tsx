import { ReactNode } from "react";
import { MENU_WIDTH } from "./@menu/menu";

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
