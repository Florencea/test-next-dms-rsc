"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { App } from "antd";
import { ReactNode } from "react";

export const AntdThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyleProvider hashPriority="high">
      <App>{children}</App>
    </StyleProvider>
  );
};
