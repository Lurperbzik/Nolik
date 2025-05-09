import { HookService } from "../../HookService";
import { CollectionInvitation } from "../../../models/Invitation";

type getInvitationsByCollectionProps = {
  collectionUrl: string;
  setInvitations: React.Dispatch<React.SetStateAction<CollectionInvitation[]>>;
};

export const useGetInvitationsByCollection = ({
  collectionUrl,
  setInvitations,
}: getInvitationsByCollectionProps) => {
  const encodedUrl = encodeURIComponent(collectionUrl);
  const { loading, error, request } = HookService({
    request: {
      url: `http://localhost:3000/invitations/${encodedUrl}`,
      method: "GET",
    },
    setData: setInvitations,
  });

  const getInvitationsByCollection = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, getInvitationsByCollection };
};
