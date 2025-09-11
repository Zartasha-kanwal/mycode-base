"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStatus } from "./lib/useAuth";

export default function Home() {
  const isAuth = useAuthStatus();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuth, router]);

  return null;
}
