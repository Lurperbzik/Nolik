import { CustomModal } from "../Modal";
import { Invitation } from "../../../models/Invitation";

const modalData: {
  modalTextField: keyof Invitation;
  title: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
  colorButton: string;
} = {
  modalTextField: "nameCollection",
  title: "Delete Invitation for",
  textSecondary: "",
  button: true,
  buttonText: "Confirm",
  colorButton: "#b5351c",
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
      colorButton={modalData.colorButton}
      onClickBottom={onClickBottom}
    />
  );
}
