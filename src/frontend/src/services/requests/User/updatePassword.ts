import { HookService } from "../../HookService";

type updatePasswordProps = {
  password: string | undefined;
};
export const useUpdatePassword = ({ password }: updatePasswordProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: "/users/password",
      method: "PUT",
      body: JSON.stringify({ password }),
    },
  });

  const updatePassword = async () => {
    const success = await request();
    return success;
  };

  return { loading, error, updatePassword };
};
