import { CustomModal } from "../Modal";
//import { ShortInvitation } from "../../../models/Invitation";
import { Collection } from "../../../models/Collection";
import { User } from "../../../models/User";
import { useColors } from "../../../theme/theme.context";

const modalData: {
  modalTextField: keyof Collection;
  title: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
} = {
  modalTextField: "name",
  title: "Send Invitation to ",
  textSecondary: "",
  button: true,
  buttonText: "Confirm",
};

type CreateInvitationModalProps = {
  user: User | undefined;
  collection: Collection | undefined;
  opened: boolean;
  onClickBottom: () => void;
  onClose: () => void;
};

export function CreateInvitationModal({
  user,
  collection,
  opened,
  onClickBottom,
  onClose,
}: CreateInvitationModalProps) {
  const { colors } = useColors();
  if (!user) {
    return null;
  }
  if (!collection) {
    return null;
  }
  return (
    <CustomModal
      data={collection}
      modalTextField={modalData.modalTextField}
      opened={opened}
      onClose={onClose}
      setOpened={() => {}}
      title={modalData.title}
      text={`Do you confirm that you would like to send the invitation to ${user.username}`}
      textSecondary={modalData.textSecondary}
      button={modalData.button}
      buttonText={modalData.buttonText}
      colorButton={colors.createInvitationButton}
      onClickBottom={onClickBottom}
    />
  );
}
