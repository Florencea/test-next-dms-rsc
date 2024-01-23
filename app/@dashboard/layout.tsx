import { ReactNode } from "react";

export default function Layout({
  nav,
  content,
}: Readonly<{
  nav: ReactNode;
  content: ReactNode;
}>) {
  return (
    <main>
      {nav}
      {content}
    </main>
  );
}
