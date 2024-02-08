"use client";

import { login } from "@/data/auth";
import { useI18n } from "@/locales/client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  Button,
  Form,
  Input,
  message,
  type ButtonProps,
  type InputProps,
} from "antd";
import type { PasswordProps } from "antd/es/input";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmitBtn = (props: ButtonProps) => {
  const { pending, data, method, action } = useFormStatus();

  return (
    <Button
      type="primary"
      block
      htmlType="submit"
      disabled={pending}
      loading={pending}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const PendingInput = (props: InputProps) => {
  const { pending, data, method, action } = useFormStatus();
  return <Input disabled={pending} {...props} />;
};

const PendingInputPassword = (props: PasswordProps) => {
  const { pending, data, method, action } = useFormStatus();
  return <Input.Password disabled={pending} {...props} />;
};

export const LoginForm = () => {
  const t = useI18n();
  const [msg, msgContext] = message.useMessage();
  const [state, formAction] = useFormState(login, null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (state?.status !== "OK" && state?.fieldData) {
      form.setFields(state.fieldData);
    } else if (state?.status !== "OK" && state?.message) {
      msg.info(state.message);
    }
  }, [form, msg, state]);

  return (
    <form
      action={formAction}
      onSubmit={() => {
        const v = structuredClone(form.getFieldsValue());
        form.resetFields();
        form.setFieldsValue(v);
      }}
    >
      {msgContext}
      <AntdRegistry>
        <Form form={form} component="div" layout="vertical">
          <Form.Item name="account" label={t("account")} required>
            <PendingInput name="account" autoFocus />
          </Form.Item>
          <Form.Item name="password" label={t("password")}>
            <PendingInputPassword name="password" />
          </Form.Item>
          <Form.Item>
            <SubmitBtn>{t("login")}</SubmitBtn>
          </Form.Item>
        </Form>
      </AntdRegistry>
    </form>
  );
};
