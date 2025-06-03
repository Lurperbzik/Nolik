import { Alert, Space } from '@mantine/core';
import { GiInfo } from 'react-icons/gi';
import { useColors } from '../../theme/theme.context';

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
  const { colors } = useColors();
  return (
    <>
      {error && (
        <>
          <Space h="md" />
          <Alert
            variant="light"
            color={colors.alertError}
            title="Error"
            icon={<GiInfo />}
          >
            {messageError}
          </Alert>
        </>
      )}
      {success && (
        <>
          <Space h="md" />
          <Alert
            variant="light"
            color={colors.alertSuccess}
            title="Success"
            icon={<GiInfo />}
          >
            {messageSuccess}
          </Alert>
        </>
      )}
    </>
  );
}
