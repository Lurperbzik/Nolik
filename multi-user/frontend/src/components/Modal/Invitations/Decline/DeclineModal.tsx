import { CustomModal } from "../../Modal";
import { Invitation } from "../../../../models/Invitation";

const modalData: {
  modalTextField: keyof Invitation;
  title: string;
  text: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
  colorButton: string;
} = {
  modalTextField: "nameCollection",
  title: "Decline Invitation for",
  text: "Are you sure you want to decline this invitation?",
  textSecondary: "",
  button: true,
  buttonText: "Confirm",
  colorButton: "#b5351c",
};

type DeclineInvitationModalProps = {
  invitation: Invitation | undefined;
  opened: boolean;
  onClickBottom: () => void;
  onClose: () => void;
};

export function DeclineInvitationModal({
  invitation,
  opened,
  onClickBottom,
  onClose,
}: DeclineInvitationModalProps) {
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
      text={modalData.text}
      textSecondary={modalData.textSecondary}
      button={modalData.button}
      buttonText={modalData.buttonText}
      colorButton={modalData.colorButton}
      onClickBottom={onClickBottom}
    />
  );
}
