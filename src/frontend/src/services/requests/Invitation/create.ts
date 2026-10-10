import { HookService } from "../../HookService";
import { ShortInvitation } from "../../../models/Invitation";

type createInvitationProps = {
  invitation: ShortInvitation | undefined;
};

export const useCreateInvitation = ({ invitation }: createInvitationProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: "/invitations",
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
