import { HookService } from "../../HookService";
import { Invitation } from "../../../models/Invitation";

type getInvitationsProps = {
  setSentInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
};

export const useGetSentInvitations = ({
  setSentInvitations,
}: getInvitationsProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations/sent",
      method: "GET",
    },
    setData: setSentInvitations,
  });

  const getSentInvitations = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, getSentInvitations };
};
