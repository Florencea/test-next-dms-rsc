import { isLogin } from "@/lib/auth";
import tailwindConfig from "@/tailwind.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tingara DMS",
  description: "A DMS use app route",
};

const PRIMARY_COLOR = tailwindConfig.theme.extend.colors.primary;

export default async function RootLayout({
  login,
  dashboard,
}: Readonly<{
  login: ReactNode;
  dashboard: ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body id="__next">
        <AntdRegistry>
          <ConfigProvider
            locale={zhTW}
            theme={{
              token: {
                colorPrimary: PRIMARY_COLOR,
                colorInfo: PRIMARY_COLOR,
                colorLink: PRIMARY_COLOR,
                colorLinkHover: PRIMARY_COLOR,
                colorLinkActive: PRIMARY_COLOR,
              },
            }}
          >
            {(await isLogin()) ? dashboard : login}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
