"use client";

import { useData } from "@/data/useData";
import { useI18n } from "@/locales/client";
import {
  Breadcrumb,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import type { DefaultOptionType } from "antd/es/select";
import Link from "next/link";
import { create, type Datatable001CreateT } from "./actions";

interface Props {
  options: {
    datatable002: DefaultOptionType[];
  };
}

export const CreateForm = ({ options }: Props) => {
  const t = useI18n();
  const { form, isLoading, msgContext } = useData<Datatable001CreateT, {}>({
    form: {
      props: {
        layout: "inline",
      },
      itemprops: {
        stringColumn1: {
          name: "stringColumn1",
          label: t("stringColumn", { idx: 1 }),
          rules: [{ required: true }],
        },
        stringColumn2: {
          name: "stringColumn2",
          label: t("stringColumn", { idx: 2 }),
          rules: [{ required: true }],
        },
        stringColumn3: {
          name: "stringColumn3",
          label: t("stringColumn", { idx: 3 }),
          rules: [{ required: true }],
        },
        stringColumn4: {
          name: "stringColumn4",
          label: t("stringColumn", { idx: 4 }),
          rules: [{ required: true }],
        },
        stringColumn5: {
          name: "stringColumn5",
          label: t("stringColumn", { idx: 5 }),
          rules: [{ required: true }],
        },
        floatColumn1: {
          name: "floatColumn1",
          label: t("floatColumn", { idx: 1 }),
          rules: [{ required: true }],
        },
        floatColumn2: {
          name: "floatColumn2",
          label: t("floatColumn", { idx: 2 }),
          rules: [{ required: true }],
        },
        floatColumn3: {
          name: "floatColumn3",
          label: t("floatColumn", { idx: 3 }),
          rules: [{ required: true }],
        },
        floatColumn4: {
          name: "floatColumn4",
          label: t("floatColumn", { idx: 4 }),
          rules: [{ required: true }],
        },
        floatColumn5: {
          name: "floatColumn5",
          label: t("floatColumn", { idx: 5 }),
          rules: [{ required: true }],
        },
        integerColumn1: {
          name: "integerColumn1",
          label: t("integerColumn", { idx: 1 }),
          rules: [{ required: true }],
        },
        integerColumn2: {
          name: "integerColumn2",
          label: t("integerColumn", { idx: 2 }),
          rules: [{ required: true }],
        },
        integerColumn3: {
          name: "integerColumn3",
          label: t("integerColumn", { idx: 3 }),
          rules: [{ required: true }],
        },
        integerColumn4: {
          name: "integerColumn4",
          label: t("integerColumn", { idx: 4 }),
          rules: [{ required: true }],
        },
        integerColumn5: {
          name: "integerColumn5",
          label: t("integerColumn", { idx: 5 }),
          rules: [{ required: true }],
        },
        booleanColumn1: {
          name: "booleanColumn1",
          label: t("booleanColumn", { idx: 1 }),
          rules: [{ required: true }],
        },
        booleanColumn2: {
          name: "booleanColumn2",
          label: t("booleanColumn", { idx: 2 }),
          rules: [{ required: true }],
        },
        booleanColumn3: {
          name: "booleanColumn3",
          label: t("booleanColumn", { idx: 3 }),
          rules: [{ required: true }],
        },
        booleanColumn4: {
          name: "booleanColumn4",
          label: t("booleanColumn", { idx: 4 }),
          rules: [{ required: true }],
        },
        booleanColumn5: {
          name: "booleanColumn5",
          label: t("booleanColumn", { idx: 5 }),
          rules: [{ required: true }],
        },
        datatable002Id: {
          name: "datatable002Id",
          label: t("datatable002"),
          rules: [{ required: true }],
        },
      },
    },
    action: create,
  });

  const backLink = "/datatable001";

  return (
    <Form {...form.props} className="block grow">
      {msgContext}
      <Card
        title={t("datatable001")}
        extra={[
          <Link href={backLink} key="back" replace>
            <Button>{t("back")}</Button>
          </Link>,
          <Button {...form.buttonProps.submit} key="submit" className="ml-3">
            {t("create")}
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
              { title: t("create") },
            ]}
          />
        </div>
        <Descriptions bordered className="mb-3 w-full">
          <Descriptions.Item label={form.itemprops.stringColumn1.label}>
            <Form.Item {...form.itemprops.stringColumn1} labelCol={{ span: 0 }}>
              <Input style={{ width: 100 }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.stringColumn2.label}>
            <Form.Item {...form.itemprops.stringColumn2} labelCol={{ span: 0 }}>
              <Input style={{ width: 100 }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.stringColumn3.label}>
            <Form.Item {...form.itemprops.stringColumn3} labelCol={{ span: 0 }}>
              <Input style={{ width: 100 }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.stringColumn4.label}>
            <Form.Item {...form.itemprops.stringColumn4} labelCol={{ span: 0 }}>
              <Input style={{ width: 100 }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.stringColumn5.label}>
            <Form.Item {...form.itemprops.stringColumn5} labelCol={{ span: 0 }}>
              <Input style={{ width: 100 }} />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered className="mb-3 w-full">
          <Descriptions.Item label={form.itemprops.floatColumn1.label}>
            <Form.Item {...form.itemprops.floatColumn1} labelCol={{ span: 0 }}>
              <InputNumber step={0.1} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.floatColumn2.label}>
            <Form.Item {...form.itemprops.floatColumn2} labelCol={{ span: 0 }}>
              <InputNumber step={0.1} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.floatColumn3.label}>
            <Form.Item {...form.itemprops.floatColumn3} labelCol={{ span: 0 }}>
              <InputNumber step={0.1} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.floatColumn4.label}>
            <Form.Item {...form.itemprops.floatColumn4} labelCol={{ span: 0 }}>
              <InputNumber step={0.1} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.floatColumn5.label}>
            <Form.Item {...form.itemprops.floatColumn5} labelCol={{ span: 0 }}>
              <InputNumber step={0.1} />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered className="mb-3 w-full">
          <Descriptions.Item label={form.itemprops.integerColumn1.label}>
            <Form.Item
              {...form.itemprops.integerColumn1}
              labelCol={{ span: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.integerColumn2.label}>
            <Form.Item
              {...form.itemprops.integerColumn2}
              labelCol={{ span: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.integerColumn3.label}>
            <Form.Item
              {...form.itemprops.integerColumn3}
              labelCol={{ span: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.integerColumn4.label}>
            <Form.Item
              {...form.itemprops.integerColumn4}
              labelCol={{ span: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.integerColumn5.label}>
            <Form.Item
              {...form.itemprops.integerColumn5}
              labelCol={{ span: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered className="mb-3 w-full">
          <Descriptions.Item label={form.itemprops.booleanColumn1.label}>
            <Form.Item
              {...form.itemprops.booleanColumn1}
              labelCol={{ span: 0 }}
            >
              <Radio.Group
                options={[
                  { label: t("yes"), value: true },
                  { label: t("no"), value: false },
                ]}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.booleanColumn2.label}>
            <Form.Item
              {...form.itemprops.booleanColumn2}
              labelCol={{ span: 0 }}
            >
              <Radio.Group
                options={[
                  { label: t("yes"), value: true },
                  { label: t("no"), value: false },
                ]}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.booleanColumn3.label}>
            <Form.Item
              {...form.itemprops.booleanColumn3}
              labelCol={{ span: 0 }}
            >
              <Radio.Group
                options={[
                  { label: t("yes"), value: true },
                  { label: t("no"), value: false },
                ]}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.booleanColumn4.label}>
            <Form.Item
              {...form.itemprops.booleanColumn4}
              labelCol={{ span: 0 }}
            >
              <Radio.Group
                options={[
                  { label: t("yes"), value: true },
                  { label: t("no"), value: false },
                ]}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.booleanColumn5.label}>
            <Form.Item
              {...form.itemprops.booleanColumn5}
              labelCol={{ span: 0 }}
            >
              <Radio.Group
                options={[
                  { label: t("yes"), value: true },
                  { label: t("no"), value: false },
                ]}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={form.itemprops.datatable002Id.label}>
            <Form.Item
              {...form.itemprops.datatable002Id}
              labelCol={{ span: 0 }}
            >
              <Select options={options.datatable002} />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Form>
  );
};
