"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as auth from "@/lib/auth";

// --------------------------------------------------
// Context types
// --------------------------------------------------
interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// --------------------------------------------------
// Context instance + hook
// --------------------------------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// --------------------------------------------------
// Provider component
// --------------------------------------------------
const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Restore user on first mount
  useEffect(() => {
    const email = typeof window !== "undefined" ? localStorage.getItem("user_email") : null;
    if (email) setUser({ email });
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken, refreshToken } = await auth.login({ email, password });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user_email", email);
    setUser({ email });
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    const { accessToken, refreshToken } = await auth.register({
      email,
      password,
      confirmPassword,
    });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user_email", email);
    setUser({ email });
  };

  const logout = async () => {
    const rt = localStorage.getItem("refreshToken");
    if (rt) {
      await auth.logout(rt).catch(() => undefined);
    }
    localStorage.clear();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
