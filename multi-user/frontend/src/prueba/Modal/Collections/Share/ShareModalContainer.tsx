import { useState, useEffect } from "react";
import { ShareCollectionModal } from "./ShareModal";
import { deleteInvitation } from "../../../../services/requests/Invitation/delete";
import { useCreateInvitation } from "../../../../services/requests/Invitation/create";
import { useGetInvitationsByCollection } from "../../../../services/requests/Invitation/getByCollection";
import { User } from "../../../../models/User";
import { Invitation, ShortInvitation } from "../../../../models/Invitation";
import { Collection } from "../../../../models/Collection";

interface ShareCollectionModalContainerProps {
  users: User[];
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  activeCollection: Collection | undefined;
}

export function ShareCollectionModalContainer({
  users,
  opened,
  setOpened,
  activeCollection,
}: ShareCollectionModalContainerProps) {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  const [activeInvitation, setActiveInvitation] = useState<
    ShortInvitation | undefined
  >(undefined);
  const [activeCollectionUrl, setActiveCollectionUrl] = useState<string>("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const { getInvitationsByCollection } = useGetInvitationsByCollection({
    collectionUrl: activeCollectionUrl,
    setInvitations: setInvitations,
  });

  useEffect(() => {
    if (activeCollection) {
      getInvitationsByCollection();
      setActiveCollectionUrl(activeCollection.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCollection]);

  useEffect(() => {
    if (activeUser && activeCollection) {
      const newInvitation: ShortInvitation = {
        collectionUrl: activeCollection.url,
        invitedUsername: activeUser.username,
      };
      setActiveInvitation(newInvitation);
    }
  }, [activeCollection, activeUser]);

  const { createInvitation } = useCreateInvitation({
    invitation: activeInvitation,
  });

  if (!activeCollection) {
    return null;
  }

  const handleDeleteInvitation = async (invitation: ShortInvitation) => {
    const shortInvitation: ShortInvitation = {
      collectionUrl: activeCollection.url,
      invitedUsername: invitation.invitedUsername,
    };
    await deleteInvitation(shortInvitation);
  };

  const handleCreateInvitation = async (
    invitation: ShortInvitation | undefined
  ) => {
    if (invitation) {
      await createInvitation();
    }
  };

  return (
    <ShareCollectionModal
      invitations={invitations}
      users={users}
      setActiveUser={setActiveUser}
      opened={opened}
      onClickBottomCreateInvitation={() => {
        if (activeUser) {
          handleCreateInvitation(activeInvitation);
        }
        setOpened(false);
      }}
      onClickBottomDeleteInvitation={() => {
        if (activeInvitation) {
          handleDeleteInvitation(activeInvitation);
        }
        setOpened(false);
      }}
      activeCollection={activeCollection}
      activeUser={activeUser}
      onClose={() => {
        setOpened(false);
      }}
    />
  );
}
