import { Alert, Space } from "@mantine/core";
import { GiInfo } from "react-icons/gi";
import { useColors } from "../../theme/theme.context";
import { useMantineTheme } from "@mantine/core";

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
  const theme = useMantineTheme();
  console.log("CustomAlert rendered");
  console.log("orange", theme.colors.orange[6]);

  console.log("blue", theme.colors.blue[6]);
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
