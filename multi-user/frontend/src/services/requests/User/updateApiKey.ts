import { HookService } from "../../HookService";

type updateApiKeyProps = {
  apiKey: string | undefined;
};
export const useUpdateApiKey = ({ apiKey }: updateApiKeyProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/users/api-key",
      method: "PUT",
      body: JSON.stringify({ apiKey }),
    },
  });

  const updateApiKey = async () => {
    const success = await request();
    return success;
  };

  return { loading, error, updateApiKey };
};
