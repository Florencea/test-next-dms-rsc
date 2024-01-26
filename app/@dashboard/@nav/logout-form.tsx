"use client";

import { useFormStatus } from "react-dom";
import { logout } from "./actions";

export const LogoutForm = () => {
  const { pending } = useFormStatus();
  return (
    <form action={logout}>
      <button type="submit" aria-disabled={pending}>
        Logout
      </button>
    </form>
  );
};
