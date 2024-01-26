"use client";

import { Layout, Typography } from "antd";
import { LogoutForm } from "./logout-form";

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

interface Props {
  userName?: string;
}

export const Header = ({ userName }: Props) => {
  return (
    <AntdHeader className="sticky top-0 z-10 flex w-full items-stretch justify-between">
      <h1 className="text-lg font-bold">TINGARA DMS</h1>
      <div className="flex shrink-0 items-center justify-end gap-3">
        <Text strong>{userName}</Text>
        <LogoutForm />
      </div>
    </AntdHeader>
  );
};
