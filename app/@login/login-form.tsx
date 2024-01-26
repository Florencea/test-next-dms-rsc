"use client";

import { AntdThemeProvider } from "@/lib/antd";
import { useAntdForm } from "@/lib/form";
import { Form, Input } from "antd";
import { login } from "./actions";

interface LoginT {
  account: string;
  password: string;
}

export const LoginForm = () => {
  const { formProps, formItemProps, SubmitBtn } = useAntdForm<LoginT>({
    formProps: {},
    formItemProps: {
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
    formAction: login,
  });

  return (
    <AntdThemeProvider>
      <Form {...formProps}>
        <Form.Item {...formItemProps.account}>
          <Input />
        </Form.Item>
        <Form.Item {...formItemProps.password}>
          <Input.Password />
        </Form.Item>
        <SubmitBtn>Login</SubmitBtn>
      </Form>
    </AntdThemeProvider>
  );
};
