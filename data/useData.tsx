"use client";

import { DEFAULT_PUBLIC_ROUTE, type ActionT } from "@/constants/constants";
import {
  Form,
  message,
  type ButtonProps,
  type FormInstance,
  type FormItemProps,
  type FormProps,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  type JSXElementConstructor,
  type ReactElement,
} from "react";
import { useFormState, useFormStatus } from "react-dom";

type FormItemPropsT<T> = FormItemProps<T> & {
  name: T;
  label: string;
  rules: [{ required: boolean }];
};

interface UseDataParamsT<T, D> {
  form: {
    props: FormProps<T>;
    itemprops: { [K in keyof T]: FormItemPropsT<K> };
  };
  action: ActionT<T>;
}

interface UseDataT<T, D> {
  form: {
    instance: FormInstance<T>;
    props: FormProps<T>;
    itemprops: { [K in keyof T]: FormItemPropsT<K> };
    buttonProps: {
      submit: ButtonProps;
      reset: ButtonProps;
    };
  };
  data?: D;
  isLoading: boolean;
  msgContext: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const useData = <T extends object = {}, D = undefined>(
  params: UseDataParamsT<T, D>,
): UseDataT<T, D> => {
  const router = useRouter();
  const pathname = usePathname();

  const [formInstance] = Form.useForm<T>();
  const [state, action] = useFormState(params.action, {
    message: "",
    status: "OK",
  });
  const { pending } = useFormStatus();
  const [msg, msgContext] = message.useMessage();

  useEffect(() => {
    if (state.message) {
      msg.info(state.message);
    }
    if (state.status === "UNAUTHORIZED" && pathname !== DEFAULT_PUBLIC_ROUTE) {
      setTimeout(() => {
        router.refresh();
      }, 4500);
    }
  }, [msg, state]);

  return {
    form: {
      instance: formInstance,
      props: {
        form: formInstance,
        layout: "vertical",
        onFinish: (values) => {
          const formData = new FormData();
          Object.entries(values).forEach(([k, v]) => {
            if (v) {
              formData.append(k, v);
            }
          });
          action(formData);
        },
        ...params.form,
      },
      itemprops: params.form.itemprops,
      buttonProps: {
        submit: {
          type: "primary",
          htmlType: "submit",
          disabled: pending,
        },
        reset: {
          htmlType: "reset",
          disabled: pending,
        },
      },
    },
    isLoading: pending,
    msgContext,
  };
};
