import {
  Button,
  Modal,
  Space,
  Text,
  Stack,
  PasswordInput,
  TextInput,
  Fieldset,
} from "@mantine/core";
import { useState } from "react";
import { CustomAlert } from "../../components/Alert/Alert";
import { User } from "../../models/User";
import { useColors } from "../../theme/theme.context";

type ModalProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
  handleSubmit: () => void;
  setName: (value: string) => void;
  setPassword: (value: string) => void;
  name: string;
  password: string;
  error: boolean;
  loading: boolean;
  users: User[] | undefined;
};

export function AddModal({
  opened,
  setOpened,
  handleSubmit,
  name,
  password,
  setName,
  setPassword,
  error,
  loading,
  users,
}: ModalProps) {
  const [errorName, setErrorName] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const { colors } = useColors();

  function validate(): boolean {
    const finalName = name.trim();
    const exists = users?.some((user) => user.username === finalName);
    if (exists) {
      setErrorName("User already exists");
      return false;
    }
    if (!(finalName.indexOf(" ") === -1)) {
      return false;
    }

    if (password.length === 0) {
      setErrorPassword("Password must not be empty");
      return false;
    }
    if (name.length === 0) {
      setErrorName("Username must not be empty");
    }
    setName(finalName);
    return true;
  }

  function reset() {
    setName("");
    setPassword("");
    setErrorName("");
    setErrorPassword("");
  }

  const handleSubmitButton = () => {
    if (validate()) {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setOpened(false);
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
          }}
        >
          Add new user
        </Text>
      }
      size="md"
      overlayProps={{ backgroundOpacity: 0.55 }}
      transitionProps={{ transition: "fade", duration: 100 }}
    >
      <Space h="md" />
      <Fieldset
        legend="User"
        radius="xs"
        style={{
          border: "1px solid " + colors.line,
          padding: 20,
          borderRadius: 12,
          marginBottom: 16,
        }}
        styles={{
          legend: {
            fontWeight: 600,
            fontSize: 18,
            color: colors.titleText,
          },
        }}
      >
        <Stack>
          <TextInput
            placeholder="Username"
            withAsterisk
            label="Owner"
            size="md"
            radius="xs"
            variant="filled"
            error={errorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.currentTarget.value);
              setErrorName("");
            }}
          />
          <PasswordInput
            placeholder="Password"
            withAsterisk
            size="md"
            label="Password"
            radius="xs"
            variant="filled"
            error={errorPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value);
              setErrorPassword("");
            }}
          />
        </Stack>
      </Fieldset>
      <hr
        style={{
          position: "relative",
          left: "-16px",
          width: "calc(100% + 32px)",
          border: "none",
          borderTop: "1px solid " + colors.separator,
        }}
      ></hr>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          color={colors.addCollectionButton}
          loading={loading}
          onClick={handleSubmitButton}
        >
          <Text
            fw={600}
            size="md"
            style={{ marginTop: "2px", color: colors.addCollectionButtonText }}
          >
            Submit
          </Text>
        </Button>
      </div>

      {error && (
        <CustomAlert
          success={false}
          error={error}
          messageSuccess={""}
          messageError={"Failed to add new user, please try again later."}
        />
      )}
    </Modal>
  );
}
