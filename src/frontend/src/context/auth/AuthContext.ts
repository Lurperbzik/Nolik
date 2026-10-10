import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  userId: number | null;
  role: string | null;
  isAdmin: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}>({
  isAuthenticated: false,
  userId: null,
  role: null,
  isAdmin: false,
  token: null,
  login: () => {},
  logout: () => {},
  checkAuth: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
