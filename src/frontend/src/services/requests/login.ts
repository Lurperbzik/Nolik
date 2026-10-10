import { HookService } from "../HookService";

export interface LoginData {
  token: string;
}

type useLoginProps = {
  username: string;
  password: string;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
};

export const useLogin = ({
  username,
  password,
  setLoginData,
}: useLoginProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: "/auth/login",
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    },
    setData: setLoginData,
  });

  const login = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, login };
};
