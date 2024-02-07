"use client";

import { useData } from "@/data/useData";
import { useClientPath } from "@/utils/client";
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
import { useEffect } from "react";
import {
  getList,
  remove,
  type FishRecordT,
  type FishSearchParamsT,
} from "./actions";

export const TableForm = () => {
  const { form, data, isLoading } = useData<
    FishSearchParamsT,
    { list: FishRecordT[]; total: number }
  >({
    form: {
      props: {
        layout: "inline",
        initialValues: {
          current: 1,
          pageSize: 10,
        },
      },
      itemprops: {
        name: {
          name: "name",
          label: "名稱",
          rules: [{ required: false }],
        },
        col1: {
          name: "col1",
          label: "欄位1",
          rules: [{ required: false }],
        },
        period: {
          name: "period",
          label: "建立時間",
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
  } = useData<Pick<FishRecordT, "id">, {}>({
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

  const itemLinkPrefix = useClientPath("/fish");

  const tableProps: TableProps<FishRecordT> = {
    rowKey: "id",
    columns: [
      {
        title: "操作",
        dataIndex: "id",
        width: 160,
        render: (_, record) => {
          const itemLink = `${itemLinkPrefix}/${record.id}`;
          return (
            <Space>
              <Link href={itemLink}>
                <Button>查看</Button>
              </Link>
              <Form {...formRemove.props}>
                <Form.Item {...formRemove.itemprops.id} className="hidden">
                  <Input />
                </Form.Item>
                <Popconfirm
                  title="你確定要刪除這筆資料嗎？"
                  icon={null}
                  onConfirm={() => {
                    formRemove.instance.setFieldValue("id", record.id);
                    formRemove.instance.submit();
                    form.instance.submit();
                  }}
                  okButtonProps={{ danger: true, type: "primary" }}
                  okText="是"
                  cancelText="否"
                >
                  <Button danger>刪除</Button>
                </Popconfirm>
              </Form>
            </Space>
          );
        },
      },
      {
        title: "名稱",
        dataIndex: "name",
      },
      {
        title: "欄位1",
        dataIndex: "col1",
      },
      {
        title: "建立時間",
        dataIndex: "createdAt",
        render: (_, record) =>
          dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      },
    ],
    dataSource: data?.list,
    loading: isLoading,
    pagination: {
      showSizeChanger: true,
      showTotal: (total, [start, end]) =>
        `目前是 ${total} 筆中的 第 ${start} 筆到第 ${end} 筆`,
      locale: {
        items_per_page: "筆/頁",
      },
      current,
      pageSize,
      total: data?.total,
      onChange: (page, pageSize) => {
        form.instance.setFieldValue("current", page);
        form.instance.setFieldValue("pageSize", pageSize);
      },
    },
  };

  useEffect(() => {
    form.instance.submit();
  }, [form.instance]);

  return (
    <Card
      title="魚類管理"
      extra={[
        <Link key="create" href="/fish/new">
          <Button>新增魚類</Button>
        </Link>,
      ]}
    >
      {msgContextRemove}
      <Space className="w-full" direction="vertical" size="large">
        <Form {...form.props}>
          <Form.Item {...form.itemprops.name}>
            <Input />
          </Form.Item>
          <Form.Item {...form.itemprops.col1}>
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
          <Form.Item>
            <Button {...form.buttonProps.reset}>重置</Button>
          </Form.Item>
          <Button {...form.buttonProps.submit}>搜尋</Button>
        </Form>
        <Table {...tableProps} />
      </Space>
    </Card>
  );
};
