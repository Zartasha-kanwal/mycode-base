"use client";

import React from "react";
import { Table, Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Customer {
  key: string;
  no: number;
  name: string;
  phone: string;
  email: string;
  status: "Active" | "Waiting" | "Failed" | string;
}

const data: Customer[] = [
  {
    key: "1",
    no: 1,
    name: "Jhon Doe",
    phone: "+1 324-234-2333",
    email: "Jhondoe1@gmail.com",
    status: "Waiting",
  },
  {
    key: "2",
    no: 2,
    name: "Anna Nestrom",
    phone: "+1 324-234-2333",
    email: "Jhondoe2@gmail.com",
    status: "Active",
  },
  {
    key: "3",
    no: 3,
    name: "Sophia Reynolds",
    phone: "+1 324-234-2333",
    email: "Jhondoe3@gmail.com",
    status: "Failed",
  },
];

// Avatar colors
const colors = [
  "#1677ff",
  "#52c41a",
  "#fa8c16",
  "#eb2f96",
  "#13c2c2",
  "#722ed1",
];
const getColor = (name: string) => {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "green";
    case "Waiting":
      return "orange";
    case "Failed":
      return "cyan"; // aqua-ish
    default:
      return "blue"; // fallback
  }
};

const TableComponent: React.FC = () => {
  const columns: ColumnsType<Customer> = [
    { title: "No.", dataIndex: "no", key: "no", width: 100 },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text: string) => (
        <div className="customer-name">
          <Avatar
            style={{ backgroundColor: getColor(text), marginRight: "8px" }}
          >
            {text
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <span>{text}</span>
        </div>
      ),
    },
    { title: "Phone No.", dataIndex: "phone", key: "phone", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 300 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: Customer["status"]) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="project-table-wrapper">
      <Table
        className="project-table"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default TableComponent;
