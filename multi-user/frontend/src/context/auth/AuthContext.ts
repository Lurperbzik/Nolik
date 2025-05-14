import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  userId: number | null;
  login: () => void;
  logout: () => void;
  token: string | null;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userId: null,
  token: null,
});

export function useAuthContext() {
  return useContext(AuthContext);
}
