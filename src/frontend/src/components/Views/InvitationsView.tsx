import { useState } from "react";
import { NavInvitations } from "../Nav/Invitations/NavInvitations";
import { DeclineInvitationModalContainer } from "../Modal/Invitations/Decline/DeclineModalContanier";
import { AcceptInvitationModalContainer } from "../Modal/Invitations/Accept/AcceptModalContainer";
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
      <AcceptInvitationModalContainer
        invitation={activeInvitation}
        opened={acceptModalOpened}
        setOpened={setAcceptModalOpened}
      />
      <DeclineInvitationModalContainer
        invitation={activeInvitation}
        opened={declineModalOpened}
        setOpened={setDeclineModalOpened}
      />
    </>
  );
}
