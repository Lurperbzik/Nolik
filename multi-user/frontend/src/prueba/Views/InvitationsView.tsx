import { useState } from "react";
import { NavInvitations } from "../Nav/Invitations/NavInvitations";
import { DeclineInvitationModal } from "../Modal/Invitations/DeclineModal";
import { AcceptInvitationModal } from "../Modal/Invitations/AcceptModal";
import { Invitation } from "../../models/Invitation";

interface InvitationsViewProps {
  invitations: Invitation[];
}

export function InvitationsView({ invitations }: InvitationsViewProps) {
  const [activeInvitation, setActiveInvitation] = useState<Invitation>();
  const [acceptModalOpened, setAcceptModalOpened] = useState(false);
  const [declineModalOpened, setDeclineModalOpened] = useState(false);

  return (
    <>
      <NavInvitations
        invitations={invitations}
        setActive={setActiveInvitation}
        active={activeInvitation}
        setAcceptModalOpened={setAcceptModalOpened}
        setDeclineModalOpened={setDeclineModalOpened}
      />
      <AcceptInvitationModal
        invitation={activeInvitation}
        opened={acceptModalOpened}
        onClickBottom={() => {
          setAcceptModalOpened(false);
        }}
        onClose={() => {
          setAcceptModalOpened(false);
        }}
      />
      <DeclineInvitationModal
        invitation={activeInvitation}
        opened={declineModalOpened}
        onClickBottom={() => {
          setDeclineModalOpened(false);
        }}
        onClose={() => {
          setDeclineModalOpened(false);
        }}
      />
    </>
  );
}
