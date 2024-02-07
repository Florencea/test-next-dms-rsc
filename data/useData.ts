"use client";

import { MSG_DURATION, type ActionT } from "@/constants/data";
import { DEFAULT_PUBLIC_ROUTE } from "@/constants/route";
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
  action: ActionT<D>;
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
      msg.info(state.message, MSG_DURATION / 1000);
    }
    if (state.status === "UNAUTHORIZED" && pathname !== DEFAULT_PUBLIC_ROUTE) {
      setTimeout(() => {
        router.refresh();
      }, MSG_DURATION);
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
        ...params.form.props,
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
          onClick: () => {
            formInstance.resetFields();
            formInstance.submit();
          },
        },
      },
    },
    isLoading: pending,
    data: state.data,
    msgContext,
  };
};
