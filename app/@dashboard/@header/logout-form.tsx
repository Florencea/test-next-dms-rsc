"use client";

import { useData } from "@/data/useData";
import { Button, Form } from "antd";
import { logout } from "./actions";

export const LogoutForm = () => {
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
        登出
      </Button>
    </Form>
  );
};
