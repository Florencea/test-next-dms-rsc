"use client";

import { Fish } from "@prisma/client";
import { Table as AntdTable, TableProps } from "antd";

interface Props {
  data?: Fish[];
}

export const Table = ({ data }: Props) => {
  const tableProps: TableProps<Fish> = {
    rowKey: "id",
    columns: [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "名稱",
        dataIndex: "name",
      },
      {
        title: "COL1",
        dataIndex: "col1",
      },
      {
        title: "COL2",
        dataIndex: "col2",
      },
      {
        title: "COL3",
        dataIndex: "col3",
      },
      {
        title: "COL4",
        dataIndex: "col4",
      },
      {
        title: "COL5",
        dataIndex: "col5",
      },
      {
        title: "建立時間",
        dataIndex: "createdAt",
      },
      {
        title: "更新時間",
        dataIndex: "updatedAt",
      },
    ],
    dataSource: data,
  };
  return <AntdTable {...tableProps} />;
};
