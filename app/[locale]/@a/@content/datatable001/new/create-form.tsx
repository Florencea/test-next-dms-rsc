"use client";

import { useData } from "@/data/useData";
import { useClientPath } from "@/utils/client";
import {
  Breadcrumb,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
} from "antd";
import Link from "next/link";
import { create, type FishCreateT } from "./actions";

export const CreateForm = () => {
  const { form, isLoading, msgContext } = useData<FishCreateT, {}>({
    form: {
      props: {
        layout: "inline",
      },
      itemprops: {
        name: {
          name: "name",
          label: "名稱",
          rules: [{ required: true }],
        },
        col1: {
          name: "col1",
          label: "欄位1",
          rules: [{ required: true }],
        },
        col2: {
          name: "col2",
          label: "欄位2",
          rules: [{ required: true }],
        },
        col3: {
          name: "col3",
          label: "欄位3",
          rules: [{ required: true }],
        },
        col4: {
          name: "col4",
          label: "欄位4",
          rules: [{ required: true }],
        },
        col5: {
          name: "col5",
          label: "欄位5",
          rules: [{ required: true }],
        },
      },
    },
    action: create,
  });

  const backLink = useClientPath("/datatable001");

  return (
    <Card>
      {msgContext}
      <Form {...form.props} className="w-full">
        <div className="mb-3 flex w-full items-center justify-between">
          <Breadcrumb
            items={[
              { title: <Link href={backLink}>魚類管理</Link> },
              { title: "新增魚類" },
            ]}
          />
          <Button {...form.buttonProps.submit}>新增魚類</Button>
        </div>
        <Descriptions bordered className="w-full">
          <Descriptions.Item label={form.itemprops.name.label}>
            <Form.Item {...form.itemprops.name} labelCol={{ span: 0 }}>
              <Input />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.col1.label}>
            <Form.Item {...form.itemprops.col1} labelCol={{ span: 0 }}>
              <Input />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.col2.label}>
            <Form.Item {...form.itemprops.col2} labelCol={{ span: 0 }}>
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.col3.label}>
            <Form.Item {...form.itemprops.col3} labelCol={{ span: 0 }}>
              <Input />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.col4.label}>
            <Form.Item {...form.itemprops.col4} labelCol={{ span: 0 }}>
              <Input />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.col5.label}>
            <Form.Item {...form.itemprops.col5} labelCol={{ span: 0 }}>
              <Input />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </Card>
  );
};
