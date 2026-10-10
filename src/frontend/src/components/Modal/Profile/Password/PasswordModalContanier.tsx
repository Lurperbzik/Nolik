import { useState } from "react";
import { useUpdatePassword } from "../../../../services/requests/User/updatePassword";
import { PasswordModal } from "./PasswordModal";

type PasswordModalContainerProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PasswordModalContainer({
  opened,
  setOpened,
}: PasswordModalContainerProps) {
  const [password, setPassword] = useState<string>("");
  const [request, setRequest] = useState<boolean>(false);

  const { updatePassword, loading, error } = useUpdatePassword({
    password: password,
  });

  return (
    <PasswordModal
      opened={opened}
      setOpened={setOpened}
      input={password}
      setInput={setPassword}
      onSuccess={async () => {
        await updatePassword();
        setRequest(true);
      }}
      errorRequest={error}
      loadingRequest={loading}
      request={request}
      setRequest={setRequest}
    />
  );
}
