import { DeclineInvitationModal } from "./DeclineModal";
import { Invitation } from "../../../../models/Invitation";
import { useDeclineInvitation } from "../../../../services/requests/Invitation/decline";

interface DeclineInvitationModalContainerProps {
  invitation: Invitation | undefined;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export function DeclineInvitationModalContainer({
  invitation,
  opened,
  setOpened,
}: DeclineInvitationModalContainerProps) {
  const { declineInvitation } = useDeclineInvitation({
    invitation: invitation,
  });

  return (
    <DeclineInvitationModal
      invitation={invitation}
      opened={opened}
      onClickBottom={() => {
        declineInvitation();
        setOpened(false);
      }}
      onClose={() => setOpened(false)}
    />
  );
}
