import { HookService } from "../../HookService";
import { CollectionInvitation } from "../../../models/InvitationOld";

type useAcceptInvitationProps = {
  invitation: CollectionInvitation;
};

export const useAcceptInvitation = ({
  invitation,
}: useAcceptInvitationProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations/accept",
      method: "POST",
      body: JSON.stringify(invitation),
    },
  });

  const acceptInvitation = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, acceptInvitation };
};
