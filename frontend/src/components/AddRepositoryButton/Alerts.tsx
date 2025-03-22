import { Alert, Space } from '@mantine/core';
import { GiInfo } from 'react-icons/gi';

type AlertProps = {
  error: string | null;
  success: boolean;
};

export function Alerts({ error, success }: AlertProps) {
  return (
    <>
      {error && (
        <>
          <Space h="md" />
          <Alert variant="light" color="red" title="Error" icon={<GiInfo />}>
            {error}
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
            Repository varified successfully! It may take a few minutes to load.
            You can close this modal now.
          </Alert>
        </>
      )}
    </>
  );
}
