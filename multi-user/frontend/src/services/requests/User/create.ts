import { HookService } from "../../HookService";

export interface createUserProps {
  username: string;
  password: string;
}

export const useCreateUser = ({ username, password }: createUserProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: "/users",
      method: "POST",
      body: JSON.stringify({ username, password }),
    },
  });

  const createUser = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, createUser };
};
