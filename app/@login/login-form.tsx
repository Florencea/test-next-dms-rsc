"use client";

import { useData } from "@/data/useData";
import { AntdThemeProvider } from "@/lib/antd";
import { Button, Form, Input } from "antd";
import { login, type LoginT } from "./actions";

export const LoginForm = () => {
  const { form, msgContext } = useData<LoginT>({
    form: {
      props: {},
      itemprops: {
        account: {
          name: "account",
          label: "帳號",
          rules: [{ required: true }],
        },
        password: {
          name: "password",
          label: "密碼",
          rules: [{ required: true }],
        },
      },
    },
    action: login,
  });

  return (
    <AntdThemeProvider>
      {msgContext}
      <Form {...form.props}>
        <Form.Item {...form.itemprops.account}>
          <Input autoFocus />
        </Form.Item>
        <Form.Item {...form.itemprops.password}>
          <Input.Password />
        </Form.Item>
        <Button {...form.buttonProps.submit}>登入</Button>
      </Form>
    </AntdThemeProvider>
  );
};
