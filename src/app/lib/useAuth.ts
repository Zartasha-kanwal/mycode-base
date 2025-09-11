"use client";

import { useEffect, useState } from "react";
import { auth } from "./auth";  

export function useClientUser() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    setUser(auth.getUser());
  }, []);

  return user;
}

export function useAuthStatus() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(auth.isAuthenticated());
  }, []);

  return isAuth;
}
