import { isLogin } from "@/data/auth";
import { generateMeta } from "@/utils/site";
import { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = generateMeta();

export default async function RootLayout({
  login,
  dashboard,
  params: { locale },
}: Readonly<{
  login: ReactNode;
  dashboard: ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang="zh-TW">
      <body id="__next">
        <Providers locale={locale}>
          {(await isLogin()) ? dashboard : login}
        </Providers>
      </body>
    </html>
  );
}
