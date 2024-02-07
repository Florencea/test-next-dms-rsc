import { getI18n } from "@/locales/server";
import { generateMeta } from "@/utils/site";
import { Card, Col, Row } from "antd";
import { Metadata } from "next";
import { I18nSwitcher } from "../@a/@header/i18n-switcher";
import { LoginForm } from "./login-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return generateMeta(t("login"));
}

export default async function Page() {
  const t = await getI18n();
  return (
    <Row className="h-svh bg-primary" justify="center" align="middle">
      <Col>
        <Card
          className="animate-fade-in-up"
          title={t("login")}
          extra={[<I18nSwitcher key="i18nswitcher" />]}
        >
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
}
