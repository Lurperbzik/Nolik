import { CustomModal } from "../Modal";
import { Invitation } from "../../../models/Invitation";
import { useColors } from "../../../theme/theme.context";

const modalData: {
  modalTextField: keyof Invitation;
  title: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
} = {
  modalTextField: "nameCollection",
  title: "Delete Invitation for",
  textSecondary: "",
  button: true,
  buttonText: "Confirm",
};

type DeleteInvitationModalProps = {
  invitation: Invitation | undefined;
  opened: boolean;
  onClickBottom: () => void;
  onClose: () => void;
};

export function DeleteInvitationModal({
  invitation,
  opened,
  onClickBottom,
  onClose,
}: DeleteInvitationModalProps) {
  const { colors } = useColors();
  if (!invitation) {
    return null;
  }
  return (
    <CustomModal
      data={invitation}
      modalTextField={modalData.modalTextField}
      opened={opened}
      onClose={onClose}
      setOpened={() => {}}
      title={modalData.title}
      text={`Do you confirm that ${invitation.invitedUsername}'s access to this collection should be revoked?`}
      textSecondary={modalData.textSecondary}
      button={modalData.button}
      buttonText={modalData.buttonText}
      colorButton={colors.deleteInvitationButton}
      onClickBottom={onClickBottom}
    />
  );
}
