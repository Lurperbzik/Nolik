import { HookService } from "../HookService";

export const useLogout = () => {
  const { loading, error, request } = HookService({
    request: {
      path: "/auth/logout",
      method: "POST",
    },
  });

  const logout = async () => {
    const success = await request();
    return success;
  };

  return { loading, error, logout };
};
