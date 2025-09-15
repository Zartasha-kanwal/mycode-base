"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Alert, App } from "antd"; 
import { auth } from "../lib/auth";
import styles from "./login.module.scss";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Get message API from App.useApp()
  const { message } = App.useApp();

  const onFinish = (values: LoginFormValues) => {
    try {
      auth.login(values);
      message.success("Login successful!"); 
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(" Login failed:", err.message);
        setError(err.message || "Invalid email or password");
      } else {
        console.error(" Unknown login error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Login" className={styles.card}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            className={styles.alert}
          />
        )}

        <Form layout="vertical" onFinish={onFinish} className={styles.form}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>

        <div className={styles.link}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </Card>
    </div>
  );
}
