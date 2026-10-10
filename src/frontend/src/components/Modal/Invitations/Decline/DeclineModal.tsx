import { CustomModal } from "../../Modal";
import { Invitation } from "../../../../models/Invitation";
import { useColors } from "../../../../theme/theme.context";

const modalData: {
  modalTextField: keyof Invitation;
  title: string;
  text: string;
  textSecondary: string;
  button: boolean;
  buttonText: string;
} = {
  modalTextField: "nameCollection",
  title: "Decline Invitation for",
  text: "Are you sure you want to decline this invitation?",
  textSecondary: "",
  button: true,
  buttonText: "Confirm",
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
      text={modalData.text}
      textSecondary={modalData.textSecondary}
      button={modalData.button}
      buttonText={modalData.buttonText}
      colorButton={colors.declineInvitationButton}
      onClickBottom={onClickBottom}
    />
  );
}
