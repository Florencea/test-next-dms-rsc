"use client";

import { MENU_WIDTH, NAV_HEIGHT } from "@/constants/theme";
import { SmileOutlined, StarOutlined } from "@ant-design/icons";
import { Menu as AntdMenu, Layout, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "/star",
    icon: <StarOutlined />,
    label: <Link href="/star">星星管理</Link>,
  },
  {
    key: "/fish",
    icon: <SmileOutlined />,
    label: <Link href="/fish">魚類管理</Link>,
  },
];

export const Menu = () => {
  const pathname = usePathname();
  return (
    <Sider
      className="fixed bottom-0 left-0 top-0 h-svh bg-white"
      width={MENU_WIDTH}
      style={{ paddingTop: NAV_HEIGHT }}
    >
      <AntdMenu
        className="h-svh"
        mode="inline"
        defaultSelectedKeys={[pathname.split("/")?.[1]]}
        items={menuItems}
      />
    </Sider>
  );
};
