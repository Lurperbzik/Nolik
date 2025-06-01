import { Button, Modal, Text, Space } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useColors } from "../../../../theme/theme.context";

const modalData: {
  title: string;
  buttonText: string;
} = {
  title: "Close Session",
  buttonText: "Logout",
};

type LogoutModalProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
};

export function LogoutModal({ opened, setOpened, onClick }: LogoutModalProps) {
  const { colors } = useColors();

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title={
        <Text size="lg" fw="800" style={{ color: colors.modalTitle }}>
          {modalData.title}
        </Text>
      }
      styles={{
        content: {
          backgroundColor: colors.backgroundPrimary,
        },
        header: {
          backgroundColor: colors.backgroundPrimary,
          borderBottom: "1px solid " + colors.separator,
        },
      }}
    >
      <Space h="md" />
      <Button
        fullWidth
        style={{
          backgroundColor: colors.logoutModalButton,
          marginLeft: "auto",
          width: "25%",
        }}
        onClick={() => onClick()}
      >
        {modalData.buttonText}
      </Button>
    </Modal>
  );
}
