import { isLogin } from "@/data/auth";
import { generateMeta } from "@/utils/server";
import { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = generateMeta();

export default async function RootLayout({
  u,
  a,
  params: { locale },
}: Readonly<{
  u: ReactNode;
  a: ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang="zh-TW">
      <body id="__next">
        <Providers locale={locale}>{(await isLogin()) ? a : u}</Providers>
      </body>
    </html>
  );
}
