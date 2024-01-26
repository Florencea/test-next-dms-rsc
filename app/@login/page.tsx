import { Card, Col, Row } from "antd";
import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login - Tingara DMS",
};

export default function Page() {
  return (
    <Row className="h-svh bg-primary" justify="center" align="middle">
      <Col>
        <Card title="Login">
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
}
