import { PasswordInput, Button, Modal, Text, Space } from "@mantine/core";
import { useState, Dispatch, SetStateAction } from "react";
import { CustomAlert } from "../../../Alert/Alert";
import { useColors } from "../../../../theme/theme.context";

const modalData: {
  title: string;
  buttonText: string;
  inputPlaceHolder: string;
  inputLabel: string;
} = {
  title: "Change your Password",
  buttonText: "Save",
  inputPlaceHolder: "New Password",
  inputLabel:
    "Changing your password will replace the current one. Please enter your new password below.",
};

type PasswordModalProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onSuccess: () => void;
  errorRequest: boolean;
  loadingRequest: boolean;
  request: boolean;
  setRequest: Dispatch<SetStateAction<boolean>>;
};

export function PasswordModal({
  opened,
  setOpened,
  input,
  setInput,
  onSuccess,
  errorRequest,
  loadingRequest,
  request,
  setRequest,
}: PasswordModalProps) {
  const { colors } = useColors();
  const [repeatedInput, setRepeatedInput] = useState("");
  const [error, setError] = useState("");
  const [repeatedError, setRepeatedError] = useState("");

  const validateInput = (): boolean => {
    if (input.trim() === "") {
      setError("Password cannot be empty");
      return false;
    }
    return true;
  };
  const validateRepeatedInput = (): boolean => {
    if (repeatedInput !== input) {
      setRepeatedError("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        if (loadingRequest) return;
        setOpened(false);
        setError("");
        setInput("");
        setRepeatedInput("");
        setRepeatedError("");
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
          borderBottom: "1px solid " + colors.line,
        },
      }}
    >
      <Space h="md" />
      <Text size="sm" style={{ color: colors.secondaryText }}>
        {modalData.inputLabel}
      </Text>
      <Space h="md" />
      <PasswordInput
        placeholder={modalData.inputPlaceHolder}
        value={input}
        error={error}
        onChange={(e) => {
          setInput(e.currentTarget.value);
          setError("");
        }}
      />
      <Space h="sm" />
      <PasswordInput
        placeholder="Repeat New Password"
        value={repeatedInput}
        error={repeatedError}
        onChange={(e) => {
          setRepeatedInput(e.currentTarget.value);
          setRepeatedError("");
        }}
      />
      <Space h="md" />
      <Button
        fullWidth
        style={{
          backgroundColor: colors.changePasswordModalButton,
          marginLeft: "auto",
          width: "25%",
        }}
        onClick={() => {
          if (validateInput() && validateRepeatedInput()) {
            onSuccess();
          }
        }}
        loading={loadingRequest}
      >
        {modalData.buttonText}
      </Button>
      <Space h="md" />
      {request && (
        <CustomAlert
          success={!loadingRequest && !errorRequest}
          error={errorRequest}
          messageError={"An error occurred while updating the password."}
          messageSuccess={
            "Password updated successfully!\nYou can close this modal now."
          }
        />
      )}
    </Modal>
  );
}
