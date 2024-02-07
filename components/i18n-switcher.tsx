"use client";

import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";

export const I18nSwitcher = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const items: MenuProps["items"] = [
    {
      label: "繁體中文",
      key: "tw",
    },
    {
      label: "English",
      key: "en",
    },
    {
      label: "日本語",
      key: "jp",
    },
  ];

  return (
    <Dropdown
      menu={{
        selectable: true,
        selectedKeys: [currentLocale],
        items,
        onClick: ({ key }) => {
          if (key === "tw" || key === "en" || key === "jp") {
            changeLocale(key);
          }
        },
      }}
      trigger={["click"]}
      arrow
    >
      <Button
        type="text"
        className="flex items-center justify-center"
        title={t("changeLocale")}
      >
        <GlobalOutlined />
      </Button>
    </Dropdown>
  );
};