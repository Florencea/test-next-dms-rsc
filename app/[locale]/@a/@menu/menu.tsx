"use client";

import { MENU_WIDTH, NAV_HEIGHT } from "@/constants/theme";
import { useI18n } from "@/locales/client";
import { BarChartOutlined } from "@ant-design/icons";
import { Menu as AntdMenu, Layout, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

export const Menu = () => {
  const t = useI18n();
  const pathname = usePathname();
  const pathnameKey = pathname.split("/")?.[1];

  const menuItems: MenuProps["items"] = [
    {
      key: "datatable001",
      icon: <BarChartOutlined />,
      label: <Link href="/datatable001">{t("datatable001")}</Link>,
    },
    {
      key: "datatable002",
      icon: <BarChartOutlined />,
      label: <Link href="/datatable002">{t("datatable002")}</Link>,
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
