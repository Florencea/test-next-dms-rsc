"use client";

import type { ListT } from "@/constants/data";
import { useData } from "@/data/useData";
import { useI18n } from "@/locales/client";
import { useFormat } from "@/utils/client";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  type TableProps,
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  getList,
  remove,
  type Datatable001RecordT,
  type Datatable001SearchParamsT,
} from "./actions";

interface Props {
  data?: ListT<Datatable001RecordT>;
}

export const TableForm = ({ data }: Props) => {
  const t = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { renderText, renderDatetime } = useFormat();
  const { form, isLoading } = useData<
    Datatable001SearchParamsT,
    ListT<Datatable001RecordT>
  >({
    form: {
      props: {
        layout: "inline",
        onFinish: (values) => {
          const params = new URLSearchParams();
          Object.entries(values).forEach(([k, v]) => {
            if (
              typeof v === "string" ||
              typeof v === "number" ||
              typeof v === "boolean"
            ) {
              params.set(k, `${v}`);
            }
            router.replace(`${pathname}?${params.toString()}`);
          });
        },
      },
      itemprops: {
        stringColumn1: {
          name: "stringColumn1",
          label: t("stringColumn", { idx: 1 }),
          rules: [{ required: false }],
        },
        stringColumn2: {
          name: "stringColumn2",
          label: t("stringColumn", { idx: 2 }),
          rules: [{ required: false }],
        },
        period: {
          name: "period",
          label: t("createdAt"),
          rules: [{ required: false }],
        },
        start: {
          name: "start",
          label: "",
          rules: [{ required: false }],
        },
        end: {
          name: "end",
          label: "",
          rules: [{ required: false }],
        },
        current: {
          name: "current",
          label: "",
          rules: [{ required: false }],
        },
        pageSize: {
          name: "pageSize",
          label: "",
          rules: [{ required: false }],
        },
      },
    },
    action: getList,
  });

  const {
    form: formRemove,
    isLoading: isRemoving,
    msgContext: msgContextRemove,
  } = useData<Pick<Datatable001RecordT, "id">, {}>({
    form: {
      props: {},
      itemprops: {
        id: {
          name: "id",
          label: "",
          rules: [{ required: false }],
        },
      },
    },
    action: remove,
  });

  const start = Form.useWatch("start", form.instance);
  const end = Form.useWatch("end", form.instance);
  const current = Form.useWatch("current", form.instance);
  const pageSize = Form.useWatch("pageSize", form.instance);

  const itemLinkPrefix = "/datatable001";

  const tableProps: TableProps<Datatable001RecordT> = {
    rowKey: "id",
    columns: [
      {
        title: t("operation"),
        dataIndex: "id",
        width: 160,
        render: (_, record) => {
          const viewLink = `${itemLinkPrefix}/view/${record.id}`;
          const editLink = `${itemLinkPrefix}/edit/${record.id}`;
          return (
            <Space>
              <Link href={viewLink}>
                <Button>{t("view")}</Button>
              </Link>
              <Link href={editLink}>
                <Button>{t("edit")}</Button>
              </Link>
              <Form {...formRemove.props}>
                <Form.Item {...formRemove.itemprops.id} className="hidden">
                  <Input />
                </Form.Item>
                <Popconfirm
                  title={t("deleteConfirm")}
                  icon={null}
                  onConfirm={() => {
                    formRemove.instance.setFieldValue("id", record.id);
                    formRemove.instance.submit();
                    form.instance.submit();
                  }}
                  okButtonProps={{ danger: true, type: "primary" }}
                  okText={t("yes")}
                  cancelText={t("no")}
                >
                  <Button danger>{t("remove")}</Button>
                </Popconfirm>
              </Form>
            </Space>
          );
        },
      },
      {
        title: t("stringColumn", { idx: 1 }),
        dataIndex: "stringColumn1",
        render: renderText,
      },
      {
        title: t("stringColumn", { idx: 2 }),
        dataIndex: "stringColumn2",
        render: renderText,
      },
      {
        title: t("createdAt"),
        dataIndex: "createdAt",
        render: renderDatetime,
      },
    ],
    dataSource: data?.list,
    loading: isLoading,
    pagination: {
      showSizeChanger: true,
      showTotal: (total, [start, end]) =>
        t("tableShowTotal", { total, start, end }),
      locale: {
        items_per_page: t("tableItemPerPage"),
      },
      current,
      pageSize,
      total: data?.total,
      onChange: (page, pageSize) => {
        form.instance.setFieldValue("current", page);
        form.instance.setFieldValue("pageSize", pageSize);
        form.instance.submit();
      },
    },
  };

  useEffect(() => {
    if (Array.from(searchParams.entries()).length > 0) {
      form.instance.setFieldsValue(Object.fromEntries(searchParams.entries()));
      form.instance.setFieldValue("period", [
        searchParams.get("start") ? dayjs(searchParams.get("start")) : null,
        searchParams.get("end") ? dayjs(searchParams.get("end")) : null,
      ]);
    }
  }, [form.instance, searchParams]);

  return (
    <Card
      title={t("datatable001")}
      extra={[
        <Link key="create" href="/datatable001/new">
          <Button>{t("create")}</Button>
        </Link>,
      ]}
    >
      {msgContextRemove}
      <Space className="w-full" direction="vertical" size="large">
        <Form {...form.props} className="gap-3">
          <Form.Item {...form.itemprops.stringColumn1}>
            <Input />
          </Form.Item>
          <Form.Item {...form.itemprops.stringColumn2}>
            <Input />
          </Form.Item>
          <Form.Item {...form.itemprops.period}>
            <DatePicker.RangePicker
              value={[dayjs(start), dayjs(end)]}
              onChange={(values) => {
                form.instance.setFieldValue(
                  "start",
                  values?.[0]?.toISOString(),
                );
                form.instance.setFieldValue("end", values?.[1]?.toISOString());
              }}
            />
          </Form.Item>
          <Form.Item {...form.itemprops.start} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item {...form.itemprops.end} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item {...form.itemprops.current} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item {...form.itemprops.pageSize} className="hidden">
            <Input />
          </Form.Item>
          <Button {...form.buttonProps.reset}>{t("reset")}</Button>
          <Button {...form.buttonProps.submit}>{t("search")}</Button>
        </Form>
        <Table {...tableProps} />
      </Space>
    </Card>
  );
};
