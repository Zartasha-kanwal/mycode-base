"use client";

export interface User {
  email: string;
  password: string;
  name?: string;
}

export const auth = {
  register(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u: User) => u.email === user.email)) {
      throw new Error("Email already exists");
    }

    // derive name
    const firstPart = user.email.split("@")[0];
    const displayName = user.name || firstPart;

    const newUser: User = { ...user, name: displayName };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // after signup
    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem(
      "user",
      JSON.stringify({ email: newUser.email, name: displayName })
    );
  },

  login(user: Pick<User, "email" | "password">) {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u: User) => u.email === user.email && u.password === user.password
    );

    if (!found) {
      throw new Error("Invalid email or password");
    }

    // derive name if not stored
    const firstPart = found.email.split("@")[0];
    const displayName = found.name || firstPart;

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem(
      "user",
      JSON.stringify({ email: found.email, name: displayName })
    );
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated(): boolean {
    return typeof window !== "undefined" && !!localStorage.getItem("token");
  },

  getUser(): { email: string; name: string } | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as { email: string; name: string }) : null;
  },
};
