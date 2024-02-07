"use client";

import { SITE_TITLE } from "@/configs/site";
import { DEFAULT_PRIVATE_ROUTE } from "@/constants/route";
import { useClientPath } from "@/utils/client";
import { Layout, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { I18nSwitcher } from "../../../../components/i18n-switcher";
import { LogoutForm } from "./logout-form";

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

interface Props {
  userName?: string;
}

export const Header = ({ userName }: Props) => {
  const logoLink = useClientPath(DEFAULT_PRIVATE_ROUTE);
  return (
    <AntdHeader className="sticky top-0 z-10 flex w-full items-stretch justify-between">
      <div className="flex items-center justify-start gap-3 text-lg font-bold">
        <Link href={logoLink}>
          <Image src="/icon.svg" alt="logo" width={32} height={32} />
        </Link>
        <h1>{SITE_TITLE}</h1>
      </div>
      <div className="flex shrink-0 items-center justify-end">
        <div className="px-3">
          <Text strong>{userName}</Text>
        </div>
        <I18nSwitcher />
        <LogoutForm />
      </div>
    </AntdHeader>
  );
};
