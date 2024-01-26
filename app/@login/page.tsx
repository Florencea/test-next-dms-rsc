import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login - Tingara DMS",
};

export default function Page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
