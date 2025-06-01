import { HookService } from "../../HookService";
import { Invitation } from "../../../models/Invitation";

type getInvitationsProps = {
  setReceivedInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
};

export const useGetReceivedInvitations = ({
  setReceivedInvitations,
}: getInvitationsProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations/received",
      method: "GET",
    },
    setData: setReceivedInvitations,
  });

  const getReceivedInvitations = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, getReceivedInvitations };
};
