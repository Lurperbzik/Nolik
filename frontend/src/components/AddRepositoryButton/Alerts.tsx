import { useEffect } from 'react';
import { Alert, Space } from '@mantine/core';
import { GiInfo } from 'react-icons/gi';
import { useCheckRepository } from '../../services/CheckRepository';

type AlertProps = {
  loadingButton: boolean;
  setLoadingButton: (value: boolean) => void;
  owner: string;
  repo: string;
};

export function Alerts({
  loadingButton,
  setLoadingButton,
  owner,
  repo,
}: AlertProps) {
  const { error, success, getMessage } = useCheckRepository({
    owner,
    repo,
  });

  useEffect(() => {
    if (loadingButton) {
      getMessage();
    }
  }, [loadingButton, getMessage]);

  useEffect(() => {
    if (error || success) {
      setLoadingButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

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
