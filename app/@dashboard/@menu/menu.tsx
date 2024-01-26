"use client";

import { SmileOutlined, StarOutlined } from "@ant-design/icons";
import { Menu as AntdMenu, Layout, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

/**
 * Layout 左側選單寬度
 */
export const MENU_WIDTH = 200;
/**
 * Layout 頂部選單高度
 */
export const NAV_HEIGHT = 64;
/**
 * Layout 頂部選單內距
 */
export const NAV_PADDING = 20;

const menuItems: MenuProps["items"] = [
  {
    key: "/star",
    icon: <StarOutlined />,
    label: "星星管理",
  },
  {
    key: "/fish",
    icon: <SmileOutlined />,
    label: "魚類管理",
  },
];

export const Menu = () => {
  const router = useRouter();
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
        defaultSelectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => {
          router.push(key);
        }}
      />
    </Sider>
  );
};
