"use client";

import { useState, useEffect } from "react";
import TableComponent, { Customer } from "../Components/Table/Table";
import AppModal from "../Components/AppModal";
import { Form, Input, Button, Select, App } from "antd";
import styles from "./dashboard.module.scss";

const { Option } = Select;

const defaultCustomers: Customer[] = [
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

export default function DashboardPage() {
  const { message } = App.useApp(); //  use message hook

  const [customers, setCustomers] = useState<Customer[]>(() => {
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV === "development") {
        return defaultCustomers;
      }
      const stored = localStorage.getItem("customers");
      return stored ? JSON.parse(stored) : defaultCustomers;
    }
    return defaultCustomers;
  });

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }, [customers]);

  // Save edits
  const handleSave = async (values: Partial<Customer>) => {
    if (!editingCustomer) return;
    setCustomers((prev) =>
      prev.map((c) => (c.key === editingCustomer.key ? { ...c, ...values } : c))
    );
    message.success(`${editingCustomer.name} updated successfully ✅`);
    setEditingCustomer(null);
  };

  // Add new customer
  const handleAdd = async (values: Omit<Customer, "key" | "no">) => {
    const newCustomer: Customer = {
      key: Date.now().toString(),
      no: customers.length + 1,
      ...values,
    };
    setCustomers((prev) => [...prev, newCustomer]);
    message.success(`${newCustomer.name} added successfully 🎉`); 
    setIsAdding(false);
  };

  // Delete customer 
  const handleDelete = (customer: Customer) => {
    setCustomers((prev) =>
      prev
        .filter((c) => c.key !== customer.key)
        .map((c, i) => ({ ...c, no: i + 1 }))
    );
  };

  return (
    <div className={styles.pageCard}>
      <div className={styles.pageHeader}>
        <h1>My Customers</h1>
        <Button type="primary" onClick={() => setIsAdding(true)}>
          + Add Customer
        </Button>
      </div>

      <TableComponent
        data={customers}
        onEdit={(customer) => setEditingCustomer(customer)}
        onDelete={handleDelete}
      />

     {/* Edit Customer Modal */}

      <AppModal
        title="Edit Customer"
        open={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onSubmit={async () => {
          const form = document.getElementById("editForm") as HTMLFormElement;
          if (form) form.requestSubmit();
        }}
      >
        {editingCustomer && (
          <Form
            id="editForm"
            layout="vertical"
            initialValues={editingCustomer}
            onFinish={handleSave}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Waiting">Waiting</Option>
                <Option value="Failed">Failed</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </AppModal>

     {/* Add Customer Modal */}

      <AppModal
        title="Add Customer"
        open={isAdding}
        onClose={() => setIsAdding(false)}
        onSubmit={async () => {
          const form = document.getElementById("addForm") as HTMLFormElement;
          if (form) form.requestSubmit();
        }}
      >
        <Form id="addForm" layout="vertical" onFinish={handleAdd}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Waiting">Waiting</Option>
              <Option value="Failed">Failed</Option>
            </Select>
          </Form.Item>
        </Form>
      </AppModal>
    </div>
  );
}
