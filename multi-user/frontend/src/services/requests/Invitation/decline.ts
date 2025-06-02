import { HookService } from "../../HookService";
import { Invitation } from "../../../models/Invitation";

type useDeclineInvitationProps = {
  invitation: Invitation | undefined;
};

export const useDeclineInvitation = ({
  invitation,
}: useDeclineInvitationProps) => {
  if (!invitation) {
    return {
      loading: false,
      error: false,
      declineInvitation: async () => false,
    };
  }
  const { loading, error, request } = HookService({
    request: {
      path: "/invitations/decline",
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
