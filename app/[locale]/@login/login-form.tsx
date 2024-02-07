"use client";

import { useData } from "@/data/useData";
import { useI18n } from "@/locales/client";
import { Button, Form, Input } from "antd";
import { login, type LoginT } from "./actions";

export const LoginForm = () => {
  const t = useI18n();
  const { form, msgContext } = useData<LoginT, {}>({
    form: {
      props: {},
      itemprops: {
        account: {
          name: "account",
          label: t("account"),
          rules: [{ required: true }],
        },
        password: {
          name: "password",
          label: t("password"),
          rules: [{ required: true }],
        },
      },
    },
    action: login,
  });

  return (
    <>
      {msgContext}
      <Form {...form.props}>
        <Form.Item {...form.itemprops.account}>
          <Input autoFocus />
        </Form.Item>
        <Form.Item {...form.itemprops.password}>
          <Input.Password />
        </Form.Item>
        <Button {...form.buttonProps.submit}>{t("login")}</Button>
      </Form>
    </>
  );
};
