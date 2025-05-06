import { HookService } from "../HookService";

type Props = {
  owner: string;
  name: string;
};

export const useValidateRepository = ({ owner, name }: Props) => {
  const { loading, error, request } = HookService({
    request: {
      url: `http://localhost:3000/github/exists?repo_owner=${encodeURIComponent(owner)}&repo_name=${encodeURIComponent(name)}`,
      method: "GET",
    },
  });

  const validateRepository = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, validateRepository };
};
