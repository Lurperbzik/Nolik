import { TextInput, Button, Modal, Text, Space } from "@mantine/core";
import { useState, Dispatch, SetStateAction } from "react";
import { CustomAlert } from "../../../Alert/Alert";
import { useColors } from "../../../../theme/theme.context";

const modalData: {
  title: string;
  buttonText: string;
  inputPlaceHolder: string;
  inputLabel: string;
} = {
  title: "Change API Key",
  buttonText: "Save",
  inputPlaceHolder: "API Key",
  inputLabel:
    "Changing your API Key will replace the current one. Please enter your new API Key below.",
};

type ApiKeyModalProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  errorRequest: boolean;
  loadingRequest: boolean;
  request: boolean;
  setRequest: Dispatch<SetStateAction<boolean>>;
};

export function ApiKeyModal({
  opened,
  setOpened,
  input,
  setInput,
  onSuccess,
  errorRequest,
  loadingRequest,
  request,
  setRequest,
}: ApiKeyModalProps) {
  const { colors } = useColors();
  const [error, setError] = useState("");

  const validateInput = () => {
    if (input.trim() === "") {
      setError("API Key cannot be empty");
    } else {
      onSuccess();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        if (loadingRequest) return;
        setOpened(false);
        setError("");
        setInput("");
        setRequest(false);
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
      <Text size="sm" style={{ color: colors.secondaryText }}>
        {modalData.inputLabel}
      </Text>
      <Space h="md" />
      <TextInput
        placeholder={modalData.inputPlaceHolder}
        value={input}
        error={error}
        onChange={(e) => {
          setInput(e.currentTarget.value);
          setError("");
        }}
      />
      <Space h="md" />
      <Button
        fullWidth
        style={{
          backgroundColor: colors.changeApiKeyModalButton,
          marginLeft: "auto",
          width: "25%",
        }}
        onClick={() => validateInput()}
        loading={loadingRequest}
      >
        {modalData.buttonText}
      </Button>
      <Space h="md" />
      {request && (
        <CustomAlert
          success={!loadingRequest && !errorRequest}
          error={errorRequest}
          messageError={"An error occurred while updating the API Key."}
          messageSuccess={
            "API Key updated successfully!\nYou can close this modal now."
          }
        />
      )}
    </Modal>
  );
}
