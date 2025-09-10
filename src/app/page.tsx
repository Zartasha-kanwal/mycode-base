"use client";
import { redirect } from "next/navigation";
import { auth } from "./lib/auth";

export default function Home() {
  if (auth.isAuthenticated()) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
