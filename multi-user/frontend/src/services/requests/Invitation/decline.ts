import { HookService } from "../../HookService";
import { CollectionInvitation } from "../../../models/InvitationOld";

type useDeclineInvitationProps = {
  invitation: CollectionInvitation;
};

export const useDeclineInvitation = ({
  invitation,
}: useDeclineInvitationProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations/decline",
      method: "POST",
      body: JSON.stringify(invitation),
    },
  });

  const declineInvitation = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, declineInvitation };
};
