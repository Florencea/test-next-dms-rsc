"use client";

import { MENU_WIDTH, NAV_HEIGHT } from "@/constants/theme";
import { useClientPath } from "@/utils/client";
import { SmileOutlined, StarOutlined } from "@ant-design/icons";
import { Menu as AntdMenu, Layout, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

export const Menu = () => {
  const pathname = usePathname();
  const pathnameKey = pathname.split("/")?.[2];
  const menuLinkPrefix = useClientPath("");

  const menuItems: MenuProps["items"] = [
    {
      key: "fish",
      icon: <SmileOutlined />,
      label: <Link href={`${menuLinkPrefix}/fish`}>魚類管理</Link>,
    },
    {
      key: "star",
      icon: <StarOutlined />,
      label: <Link href={`${menuLinkPrefix}/star`}>星星管理</Link>,
    },
  ];

  return (
    <Sider
      className="fixed bottom-0 left-0 top-0 h-svh bg-white"
      width={MENU_WIDTH}
      style={{ paddingTop: NAV_HEIGHT }}
    >
      <AntdMenu
        className="h-svh"
        mode="inline"
        selectedKeys={[pathnameKey]}
        items={menuItems}
      />
    </Sider>
  );
};
