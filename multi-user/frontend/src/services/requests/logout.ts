import { HookService } from "../HookService";

export const useLogout = () => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/auth/logout",
      method: "POST",
    },
  });

  const logout = async () => {
    const success = await request();
    return success;
  };

  return { loading, error, logout };
};
