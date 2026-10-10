import { CustomModal } from "../../components/Modal/Modal";
import { User } from "../../models/User";
import { useColors } from "../../theme/theme.context";

const modalData: {
  modalTextField: keyof User;
  title: string;
  text: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
} = {
  modalTextField: "username",
  title: "Delete",
  text: "Are you sure you want to delete this user?",
  textSecondary:
    "By continuing, all user data as well as collections that he owns will be deleted.",
  button: true,
  buttonText: "Delete",
};

type DeleteUserModalProps = {
  user: User | undefined;
  opened: boolean;
  onClickBottom: () => void;
  onClose: () => void;
};

export function DeleteUserModal({
  user,
  opened,
  onClickBottom,
  onClose,
}: DeleteUserModalProps) {
  const { colors } = useColors();
  if (!user) {
    return null;
  }
  return (
    <CustomModal
      data={user}
      modalTextField={modalData.modalTextField}
      opened={opened}
      onClose={onClose}
      setOpened={() => {}}
      title={modalData.title}
      text={modalData.text}
      textSecondary={modalData.textSecondary}
      button={modalData.button}
      buttonText={modalData.buttonText}
      colorButton={colors.deleteCollectionButton}
      onClickBottom={onClickBottom}
    />
  );
}
