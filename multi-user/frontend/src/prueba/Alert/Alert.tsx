import { Alert, Space } from "@mantine/core";
import { GiInfo } from "react-icons/gi";

type AlertProps = {
  error: boolean;
  success: boolean;
  messageError: string | null;
  messageSuccess: string | null;
};

export function CustomAlert({
  error,
  success,
  messageSuccess,
  messageError,
}: AlertProps) {
  return (
    <>
      {error && (
        <>
          <Space h="md" />
          <Alert variant="light" color="red" title="Error" icon={<GiInfo />}>
            {messageError}
          </Alert>
        </>
      )}
      {success && (
        <>
          <Space h="md" />
          <Alert
            variant="light"
            color="green"
            title="Success"
            icon={<GiInfo />}
          >
            {messageSuccess}
            Repository varified successfully! It may take a few minutes to load.
            You can close this modal now.
          </Alert>
        </>
      )}
    </>
  );
}
