import { Button, ButtonProps, FormItemProps, FormProps, message } from "antd";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface FormActionT {
  message: string;
}

type FormItemPropsT<T> = FormItemProps<T> & {
  name: T;
  label: string;
  rules: [{ required: boolean }];
};

interface UseAntdFormT<T> {
  formProps: FormProps<T>;
  formItemProps: { [k in keyof T]: FormItemPropsT<k> };
  formAction: (prevState: unknown, formData: FormData) => Promise<FormActionT>;
}

interface UseAntdFormRT<T> {
  formProps: FormProps<T>;
  formItemProps: { [k in keyof T]: FormItemPropsT<k> };
  SubmitBtn: (props: ButtonProps) => JSX.Element;
}

export const useAntdForm = <T extends object>({
  formProps,
  formItemProps,
  formAction,
}: UseAntdFormT<T>): UseAntdFormRT<T> => {
  const [state, action] = useFormState(formAction, { message: "" });
  const { pending } = useFormStatus();
  const [msg, msgContext] = message.useMessage();

  useEffect(() => {
    if (state.message) {
      msg.info(state.message);
    }
  }, [msg, state]);

  const SubmitBtn = (props: ButtonProps) => {
    return (
      <>
        {msgContext}
        <Button
          type="primary"
          htmlType="submit"
          disabled={pending}
          {...props}
        />
      </>
    );
  };

  return {
    formProps: {
      layout: "vertical",
      onFinish: (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([k, v]) => {
          formData.append(k, v);
        });
        action(formData);
      },
      ...formProps,
    },
    formItemProps,
    SubmitBtn,
  };
};
