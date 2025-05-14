import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/check-auth", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserId(data.user);
        setToken(data.token);
      }
      setIsAuthenticated(res.ok);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: !!isAuthenticated,
      userId,
      login,
      logout,
      token,
    }),
    [isAuthenticated, login, logout, userId, token]
  );

  if (isAuthenticated === null) return;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
