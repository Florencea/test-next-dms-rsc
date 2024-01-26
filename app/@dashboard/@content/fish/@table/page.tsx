import { Card } from "antd";
import { Metadata } from "next";
import Link from "next/link";
import { getFishData } from "./actions";
import { Table } from "./table";

export const metadata: Metadata = {
  title: "魚類管理 - Tingara DMS",
};

export default async function Page() {
  const data = await getFishData();
  return (
    <Card
      extra={[
        <Link key="new" href="/fish/new">
          new
        </Link>,
      ]}
    >
      <Table data={data} />
    </Card>
  );
}
