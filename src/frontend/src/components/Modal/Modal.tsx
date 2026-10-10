import { Button, Modal, Text, Space } from "@mantine/core";
import { useColors } from "../../theme/theme.context";

type CustomModalProps<T> = {
  data: T;
  endContent?: React.ReactNode;
  modalTextField: keyof T;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  onClose: () => void;
  title: string;
  text: string;
  textSecondary?: string;
  button: boolean;
  colorButton?: string;
  buttonText?: string;
  onClickBottom: () => void;
};

export function CustomModal<T>({
  data,
  modalTextField,
  opened,
  onClose,
  setOpened,
  title,
  text,
  textSecondary,
  button,
  buttonText,
  colorButton,
  onClickBottom,
  endContent,
}: CustomModalProps<T>) {
  const { colors } = useColors();
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        onClose();
      }}
      title={
        <>
          <Text size="lg" fw="800" style={{ color: colors.modalTitle }}>
            {title}{" "}
            <Text
              size="lg"
              component="span"
              c={colors.modalHighlightText}
              fw="800"
            >
              {String(data[modalTextField])}
            </Text>
          </Text>
        </>
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
      {endContent ? (
        endContent
      ) : (
        <>
          <Text
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              color: colors.modalTitle,
            }}
            size="md"
            fw="600"
          >
            {text}
          </Text>
          <Space h="md" />
          <Text size="sm">{textSecondary}</Text>
        </>
      )}

      <hr
        style={{
          position: "relative",
          left: "-16px",
          width: "calc(100% + 32px)",
          border: "none",
          borderTop: "1px solid " + colors.separator,
        }}
      ></hr>
      {button && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="filled"
            color={colorButton}
            onClick={() => {
              onClickBottom();
              onClose();
            }}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </Modal>
  );
}
