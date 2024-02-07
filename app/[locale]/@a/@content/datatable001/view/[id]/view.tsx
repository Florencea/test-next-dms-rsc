"use client";

import { useI18n } from "@/locales/client";
import { useFormat } from "@/utils/client";
import type { Datatable001 } from "@prisma/client";
import { Breadcrumb, Button, Card, Descriptions } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  item?: Datatable001;
}

export const View = ({ item }: Props) => {
  const backLink = "/datatable001";
  const t = useI18n();
  const router = useRouter();
  const { renderText, renderDatetime, renderBoolean } = useFormat();
  return (
    <Card
      title={t("datatable001")}
      extra={[
        <Button
          key="back"
          onClick={() => {
            router.back();
          }}
        >
          {t("back")}
        </Button>,
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
            { title: renderText(item?.stringColumn1) },
          ]}
        />
      </div>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("stringColumn", { idx: 1 })}>
          {renderText(item?.stringColumn1)}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 2 })}>
          {renderText(item?.stringColumn2)}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 3 })}>
          {renderText(item?.stringColumn3)}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 4 })}>
          {renderText(item?.stringColumn4)}
        </Descriptions.Item>
        <Descriptions.Item label={t("stringColumn", { idx: 5 })}>
          {renderText(item?.stringColumn5)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("floatColumn", { idx: 1 })}>
          {renderText(item?.floatColumn1)}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 2 })}>
          {renderText(item?.floatColumn2)}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 3 })}>
          {renderText(item?.floatColumn3)}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 4 })}>
          {renderText(item?.floatColumn4)}
        </Descriptions.Item>
        <Descriptions.Item label={t("floatColumn", { idx: 5 })}>
          {renderText(item?.floatColumn5)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("integerColumn", { idx: 1 })}>
          {renderText(item?.integerColumn1)}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 2 })}>
          {renderText(item?.integerColumn2)}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 3 })}>
          {renderText(item?.integerColumn3)}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 4 })}>
          {renderText(item?.integerColumn4)}
        </Descriptions.Item>
        <Descriptions.Item label={t("integerColumn", { idx: 5 })}>
          {renderText(item?.integerColumn5)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("booleanColumn", { idx: 1 })}>
          {renderBoolean(item?.booleanColumn1)}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 2 })}>
          {renderBoolean(item?.booleanColumn2)}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 3 })}>
          {renderBoolean(item?.booleanColumn3)}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 4 })}>
          {renderBoolean(item?.booleanColumn4)}
        </Descriptions.Item>
        <Descriptions.Item label={t("booleanColumn", { idx: 5 })}>
          {renderBoolean(item?.booleanColumn5)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered className="mb-3 w-full">
        <Descriptions.Item label={t("createdAt")}>
          {renderDatetime(item?.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label={t("updatedAt")}>
          {renderDatetime(item?.updatedAt)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
