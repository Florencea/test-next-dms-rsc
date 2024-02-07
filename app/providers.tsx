"use client";

import { theme } from "@/constants/theme";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import "tailwindcss/tailwind.css";

interface Props {
  children?: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={zhTW}
        theme={theme}
        autoInsertSpaceInButton={false}
      >
        <StyleProvider hashPriority="high">
          <App>{children}</App>
        </StyleProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};
