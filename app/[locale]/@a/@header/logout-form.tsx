"use client";

import { useData } from "@/data/useData";
import { useI18n } from "@/locales/client";
import { Button, Form } from "antd";
import { logout } from "./actions";

export const LogoutForm = () => {
  const t = useI18n();
  const { form, msgContext } = useData({
    form: {
      props: {},
      itemprops: {},
    },
    action: logout,
  });
  return (
    <Form {...form.props}>
      {msgContext}
      <Button {...form.buttonProps.submit} type="text">
        {t("logout")}
      </Button>
    </Form>
  );
};
