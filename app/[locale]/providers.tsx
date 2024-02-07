"use client";

import { theme } from "@/constants/theme";
import { I18nProviderClient } from "@/locales/client";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/en";
import "dayjs/locale/zh-tw";
import "tailwindcss/tailwind.css";

interface Props {
  locale: string;
  children?: React.ReactNode;
}

export const Providers = ({ children, locale }: Props) => {
  const localeMap: Record<string, Locale> = {
    "zh-TW": zhTW,
    "en-US": enUS,
  };

  return (
    <I18nProviderClient locale={locale}>
      <AntdRegistry>
        <ConfigProvider
          locale={localeMap[locale]}
          theme={theme}
          autoInsertSpaceInButton={false}
        >
          <StyleProvider hashPriority="high">
            <App>{children}</App>
          </StyleProvider>
        </ConfigProvider>
      </AntdRegistry>
    </I18nProviderClient>
  );
};
