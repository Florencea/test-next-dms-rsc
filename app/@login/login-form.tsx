"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";

const initialState = {
  message: "",
};

export const LoginForm = () => {
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message) {
      window.alert(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <label htmlFor="account">
        <input className="border" type="text" name="account" id="account" />
      </label>
      <label htmlFor="password">
        <input
          className="border"
          type="password"
          name="password"
          id="password"
        />
      </label>
      <button type="submit" aria-disabled={pending}>
        Login
      </button>
    </form>
  );
};
