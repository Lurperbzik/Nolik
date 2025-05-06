import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  userId: number | null;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userId: null,
});

export function useAuthContext() {
  return useContext(AuthContext);
}
