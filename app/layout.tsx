import { isLogin } from "@/lib/auth";
import { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tingara DMS",
  description: "A DMS use app route",
};

export default async function RootLayout({
  login,
  dashboard,
}: Readonly<{
  login: ReactNode;
  dashboard: ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{(await isLogin()) ? dashboard : login}</body>
    </html>
  );
}
