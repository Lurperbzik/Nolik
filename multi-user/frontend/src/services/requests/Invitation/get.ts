import { HookService } from "../../HookService";
import { CollectionInvitation } from "../../../models/Invitation";

type getInvitationsProps = {
  setInvitations: React.Dispatch<React.SetStateAction<CollectionInvitation[]>>;
};

export const useGetInvitations = ({ setInvitations }: getInvitationsProps) => {
  const { loading, error, request } = HookService({
    request: {
      url: "http://localhost:3000/invitations",
      method: "GET",
    },
    setData: setInvitations,
  });

  const getInvitations = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, getInvitations };
};
