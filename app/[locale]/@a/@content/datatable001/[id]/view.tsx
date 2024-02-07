"use client";

import { useI18n } from "@/locales/client";
import { useClientPath } from "@/utils/client";
import type { Datatable001 } from "@prisma/client";
import { Breadcrumb, Button, Card, Descriptions } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  item?: Datatable001;
}

export const View = ({ item }: Props) => {
  const backLink = useClientPath("/datatable001");
  const t = useI18n();
  return (
    <Card
      title={t("datatable001")}
      extra={[
        <Link href={backLink} key="back" replace>
          <Button>{t("back")}</Button>
        </Link>,
      ]}
    >
      <div className="mb-3 flex w-full items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: (
                <Link href={backLink} replace>
                  {t("datatable001")}
                </Link>
              ),
            },
            { title: item?.stringColumn1 },
          ]}
        />
      </div>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("stringColumn", { idx: 1 })}>
          {item?.stringColumn1}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 2 })}>
          {item?.stringColumn2}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 3 })}>
          {item?.stringColumn3}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 4 })}>
          {item?.stringColumn4}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 5 })}>
          {item?.stringColumn5}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("floatColumn", { idx: 1 })}>
          {item?.floatColumn1}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 2 })}>
          {item?.floatColumn2}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 3 })}>
          {item?.floatColumn3}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 4 })}>
          {item?.floatColumn4}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 5 })}>
          {item?.floatColumn5}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("integerColumn", { idx: 1 })}>
          {item?.integerColumn1}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 2 })}>
          {item?.integerColumn2}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 3 })}>
          {item?.integerColumn3}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 4 })}>
          {item?.integerColumn4}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 5 })}>
          {item?.integerColumn5}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("booleanColumn", { idx: 1 })}>
          {item?.booleanColumn1 ? t("yes") : t("no")}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 2 })}>
          {item?.booleanColumn2 ? t("yes") : t("no")}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 3 })}>
          {item?.booleanColumn3 ? t("yes") : t("no")}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 4 })}>
          {item?.booleanColumn4 ? t("yes") : t("no")}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 5 })}>
          {item?.booleanColumn5 ? t("yes") : t("no")}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("createdAt")}>
          {dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label={t("updatedAt")}>
          {dayjs(item?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
