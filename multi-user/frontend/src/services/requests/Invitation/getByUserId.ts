import { HookService } from "../../HookService";
import { Invitation } from "../../../models/Invitation";

type getInvitationsByUserProps = {
  setInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>;
};

export const useGetInvitationsByUser = ({
  setInvitations,
}: getInvitationsByUserProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations/userId",
      method: "GET",
    },
    setData: setInvitations,
  });

  const getInvitationsByUser = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, getInvitationsByUser };
};
