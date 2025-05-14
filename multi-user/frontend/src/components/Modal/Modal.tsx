import { Button, Modal, Text, Space } from "@mantine/core";

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
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        onClose();
      }}
      title={
        <>
          <Text size="lg" fw="800" style={{ color: "#333" }}>
            {title}{" "}
            <Text size="lg" component="span" c="blue" fw="800">
              {String(data[modalTextField])}
            </Text>
          </Text>
        </>
      }
      styles={{
        content: {
          backgroundColor: "#f9f9f9",
        },
        header: {
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
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
              color: "#333",
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
          borderTop: "1px solid #e0e0e0",
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
