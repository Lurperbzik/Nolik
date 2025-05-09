import { Button, Modal, Text, Space } from "@mantine/core";

type CustomModalProps<T> = {
  data: T;
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
}: CustomModalProps<T>) {
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        onClose();
      }}
      title={
        <Text size="lg" fw="800" style={{ color: "#333" }}>
          {title}
        </Text>
      }
      fw="bold"
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
      <Text
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          color: "#333",
        }}
        size="md"
        fw="600"
      >
        {text}{" "}
        <Text component="span" c="blue" fw="bold">
          {String(data[modalTextField])}
        </Text>
        ?
      </Text>
      <Space h="md" />
      <Text size="sm">{textSecondary}</Text>
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
