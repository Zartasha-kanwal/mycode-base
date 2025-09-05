"use client"; 

import React from "react";
import { Table, Tag, Progress } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "./Table.scss";

interface ProjectData {
  key: number;
  project: string;
  status: "Pending" | "Due" | "Blocked" | "Suspended";
  manager: string;
  progress: number;
  trend: "up" | "down";
}
const data: ProjectData[] = [
  {
    key: 1,
    project: "TWLT",
    status: "Pending",
    manager: "Amery Lee",
    progress: 60,
    trend: "up",
  },
  {
    key: 2,
    project: "A16Z",
    status: "Due",
    manager: "Romayne Carlyn",
    progress: 40,
    trend: "up",
  },
  {
    key: 3,
    project: "DARK",
    status: "Due",
    manager: "Marybeth Joanna",
    progress: 75,
    trend: "down",
  },
  {
    key: 4,
    project: "Q300",
    status: "Blocked",
    manager: "Jonah Benny",
    progress: 30,
    trend: "up",
  },
  {
    key: 5,
    project: "RVNG",
    status: "Suspended",
    manager: "Daly Royle",
    progress: 55,
    trend: "down",
  },
  {
    key: 6,
    project: "FDSA",
    status: "Suspended",
    manager: "Jane Swift",
    progress: 65,
    trend: "down",
  },
];

const statusColors: Record<ProjectData["status"], string> = {
  Pending: "green",
  Due: "blue",
  Blocked: "red",
  Suspended: "orange",
};
const columns: ColumnsType<ProjectData> = [
  {
    title: "Sr",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    render: (text, record) => (
      <span className="project-cell">
        {record.trend === "up" ? (
          <ArrowUpOutlined style={{ color: "green", marginRight: 6 }} />
        ) : (
          <ArrowDownOutlined style={{ color: "red", marginRight: 6 }} />
        )}
        {text}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: ProjectData["status"]) => (
      <Tag color={statusColors[status]}>{status}</Tag>
    ),
  },

  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
  },
  {
    title: "Progress",
    dataIndex: "progress",
    key: "progress",
    render: (progress, record) => {
      let color;
      switch (record.status) {
        case "Pending":
          color = "#52c41a"; // green
          break;
        case "Due":
          color = "#1890ff"; // blue
          break;
        case "Blocked":
          color = "#ff4d4f"; // red
          break;
        case "Suspended":
          color = "#faad14"; // orange
          break;
        default:
          color = "#722323"; // orange
      }
      return (
        <Progress percent={progress} showInfo={false} strokeColor={color} />
      );
    },
  },
];

const TableComponent: React.FC = () => {
  return (
    <div className="project-table">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowClassName="custom-row"
        scroll={{ x: "max-content" }} 
      />
    </div>
  );
};

export default TableComponent;
