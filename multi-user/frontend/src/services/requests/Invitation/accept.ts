import { HookService } from "../../HookService";
import { Invitation } from "../../../models/Invitation";

type useAcceptInvitationProps = {
  invitation: Invitation | undefined;
};

export const useAcceptInvitation = ({
  invitation,
}: useAcceptInvitationProps) => {
  if (!invitation) {
    return {
      loading: false,
      error: false,
      acceptInvitation: async () => false,
    };
  }
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
