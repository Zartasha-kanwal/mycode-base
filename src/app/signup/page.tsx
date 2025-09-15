"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Alert, App } from "antd"; 
import { auth } from "../lib/auth";
import styles from "./page.module.scss";

interface SignupFormValues {
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Get message API from App.useApp()
  const { message } = App.useApp();

  const onFinish = (values: SignupFormValues) => {
    try {
      console.log("Signup attempt:", values);
      auth.register(values);
      message.success("Account created! Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Signup error:", err.message);
        setError(err.message);
      } else {
        console.error("Unknown signup error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Sign Up" className={styles.card}>
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
            Sign Up
          </Button>
        </Form>

        <div className={styles.link}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </Card>
    </div>
  );
}
