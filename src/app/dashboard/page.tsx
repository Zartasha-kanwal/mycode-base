"use client";

import TableComponent, { Customer } from "../Components/Table/Table";
import styles from "./dashboard.module.scss";

const customers: Customer[] = [
  { key: "1", no: 1, name: "Jhon Doe", phone: "+1 324-234-2333", email: "Jhondoe1@gmail.com", status: "Waiting" },
  { key: "2", no: 2, name: "Anna Nestrom", phone: "+1 324-234-2333", email: "Jhondoe2@gmail.com", status: "Active" },
  { key: "3", no: 3, name: "Sophia Reynolds", phone: "+1 324-234-2333", email: "Jhondoe3@gmail.com", status: "Failed" },
];

export default function DashboardPage() {
  return (
    <div className={styles.pageCard}>
      <h1>My Customers</h1>
      <TableComponent data={customers} />
    </div>
  );
}
