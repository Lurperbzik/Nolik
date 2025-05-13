import { AcceptInvitationModal } from "./AcceptModal";
import { Invitation } from "../../../../models/Invitation";
import { useAcceptInvitation } from "../../../../services/requests/Invitation/accept";

interface AcceptInvitationModalContainerProps {
  invitation: Invitation | undefined;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export function AcceptInvitationModalContainer({
  invitation,
  opened,
  setOpened,
}: AcceptInvitationModalContainerProps) {
  const { acceptInvitation } = useAcceptInvitation({
    invitation: invitation,
  });

  return (
    <AcceptInvitationModal
      invitation={invitation}
      opened={opened}
      onClickBottom={() => {
        acceptInvitation();
        setOpened(false);
      }}
      onClose={() => setOpened(false)}
    />
  );
}
