import { useState } from "react";
import { useUpdateApiKey } from "../../../../services/requests/User/updateApiKey";
import { ApiKeyModal } from "./ApiKeyModal";

type ApiKeyModalContainerProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ApiKeyModalContainer({
  opened,
  setOpened,
}: ApiKeyModalContainerProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [request, setRequest] = useState<boolean>(false);

  const { updateApiKey, loading, error } = useUpdateApiKey({
    apiKey: apiKey,
  });

  return (
    <ApiKeyModal
      opened={opened}
      setOpened={setOpened}
      input={apiKey}
      setInput={setApiKey}
      onSuccess={async () => {
        await updateApiKey();
        setRequest(true);
      }}
      errorRequest={error}
      loadingRequest={loading}
      request={request}
      setRequest={setRequest}
    />
  );
}
