import { Button, Modal, Space, Text } from "@mantine/core";
import { useState } from "react";
import { Form } from "../../../Form/Form";
import { useForm } from "../../../Form/useForm";
import { CustomAlert } from "../../../Alert/Alert";

type ModalProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
  handleSubmit: () => void;
  setOwner: (value: string) => void;
  setName: (value: string) => void;
  success: boolean;
  error: boolean;
  loading: boolean;
};

export function AddModal({
  opened,
  setOpened,
  handleSubmit,
  setOwner,
  setName,
  success,
  error,
  loading,
}: ModalProps) {
  const [validInput, setValidInput] = useState(false);
  const {
    values: { valueOwner, valueName },
    errors,
    handlers,
    validate,
    reset,
  } = useForm();

  const handleSubmitButton = () => {
    if (validate()) {
      setOwner(valueOwner);
      setName(valueName);
      setValidInput(true);
      handleSubmit();
    } else {
      setValidInput(false);
    }
  };

  const handleClose = () => {
    setOpened(false);
    setValidInput(false);
    reset();
  };

  return (
    <Modal
      opened={opened || loading}
      onClose={handleClose}
      title={
        <Text
          fw={600}
          size="xl"
          style={{
            marginTop: "2px",
            color: "#333",
          }}
        >
          Add Collection
        </Text>
      }
      size="md"
      overlayProps={{ backgroundOpacity: 0.55 }}
      transitionProps={{ transition: "fade", duration: 100 }}
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
      <Form errors={errors} handlers={handlers} />
      <hr
        style={{
          position: "relative",
          left: "-16px",
          width: "calc(100% + 32px)",
          border: "none",
          borderTop: "1px solid #e0e0e0",
        }}
      ></hr>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="#347D39" loading={loading} onClick={handleSubmitButton}>
          <Text fw={600} size="md" style={{ marginTop: "2px", color: "#FFFF" }}>
            Submit
          </Text>
        </Button>
      </div>

      {validInput && (
        <CustomAlert
          success={success}
          error={error}
          messageSuccess={
            "Collection varified successfully! It may take a few minutes to load.\nYou can close this modal now."
          }
          messageError={
            "Owner or collection not found, please try again.\nIf the collection is private, make sure you have the necessary permissions."
          }
        />
      )}
    </Modal>
  );
}
