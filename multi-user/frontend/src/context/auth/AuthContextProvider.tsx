import { useCallback, useEffect, useMemo, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
const host = import.meta.env.VITE_USER_MANAGEMENT_HOST;
const port = import.meta.env.VITE_USER_MANAGEMENT_PORT;

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`http://${host}:${port}/auth/check-auth`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserId(data.user);
        setToken(data.token);
        setRole(data.role);
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
    setUserId(null);
    setRole(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: !!isAuthenticated,
      userId,
      role,
      isAdmin: role === "admin",
      token,
      login,
      logout,
      checkAuth,
    }),
    [isAuthenticated, userId, role, token, login, logout, checkAuth]
  );

  if (isAuthenticated === null) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
