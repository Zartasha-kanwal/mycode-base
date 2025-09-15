"use client";

import { ReactNode } from "react";
import { Layout, Avatar, Dropdown} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { auth } from "../lib/auth";
import { useClientUser } from "../lib/useAuth";
import styles from "./dashboard.module.scss";

const { Header, Content } = Layout;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const user = useClientUser();

  const handleLogout = () => {
    auth.logout();
    router.push("/login");
  };

  const menu = {
    items: [
      { key: "profile", label: "Profile" },
      { key: "logout", label: <span onClick={handleLogout}>Logout</span> },
    ],
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1>Dashboard</h1>
        <Dropdown menu={menu} trigger={["click"]}>
          <div className={styles.userMenu}>
            <Avatar
              style={{ backgroundColor: "#ffffff22" }}
              icon={<UserOutlined />}
            />
            <span>{user?.name ?? "User"}</span>
          </div>
        </Dropdown>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
