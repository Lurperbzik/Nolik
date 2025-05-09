import { HookService } from "../../HookService";
import { Invitation } from "../../../models/Invitation";

type createInvitationProps = {
  invitation: Invitation;
};

export const useCreateInvitation = ({ invitation }: createInvitationProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations",
      method: "POST",
      body: JSON.stringify(invitation),
    },
  });

  const createInvitation = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, createInvitation };
};
