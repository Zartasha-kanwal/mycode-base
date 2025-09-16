"use client";

import { Table, Button, Space, Tag, Popconfirm, App } from "antd"; 
import type { ColumnsType } from "antd/es/table";

export interface Customer {
  key: string;
  no: number;
  name: string;
  phone: string;
  email: string;
  status: "Active" | "Waiting" | "Failed";
}

interface TableProps {
  data: Customer[];
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
}

export default function TableComponent({ data, onEdit, onDelete }: TableProps) {
  //  use the hook from App
  const { message } = App.useApp();

  const columns: ColumnsType<Customer> = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Customer["status"]) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Waiting"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              onEdit?.(record);
              message.info(`Editing ${record.name}...`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            description="This will permanently delete the customer."
            okText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={() => {
              onDelete?.(record);
              message.success(`${record.name} has been removed successfully.`);
            }}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="key"
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
}
