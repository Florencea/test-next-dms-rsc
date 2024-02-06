"use client";

import type { Fish } from "@prisma/client";
import { Breadcrumb, Card, Descriptions } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  item?: Fish;
}

export const View = ({ item }: Props) => {
  return (
    <Card>
      <div className="mb-3 flex w-full items-center justify-between">
        <Breadcrumb
          items={[
            { title: <Link href="/fish">魚類管理</Link> },
            { title: item?.name },
          ]}
        />
      </div>
      <Descriptions bordered className="w-full">
        <Descriptions.Item label="名稱">{item?.name}</Descriptions.Item>
        <Descriptions.Item label="欄位1">{item?.col1}</Descriptions.Item>
        <Descriptions.Item label="欄位2">{item?.col2}</Descriptions.Item>
        <Descriptions.Item label="欄位3">{item?.col3}</Descriptions.Item>
        <Descriptions.Item label="欄位4">{item?.col4}</Descriptions.Item>
        <Descriptions.Item label="欄位5">{item?.col5}</Descriptions.Item>
        <Descriptions.Item label="建立時間">
          {dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="最近修改">
          {dayjs(item?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
