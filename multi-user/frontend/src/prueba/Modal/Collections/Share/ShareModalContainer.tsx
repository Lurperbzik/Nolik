import { useState, useEffect } from "react";
import { ShareCollectionModal } from "./ShareModal";
import { deleteInvitation } from "../../../../services/requests/Invitation/delete";
import { useCreateInvitation } from "../../../../services/requests/Invitation/create";
import { User } from "../../../../models/User";
import { Invitation, ShortInvitation } from "../../../../models/Invitation";
import { Collection } from "../../../../models/Collection";
import { useGetInvitationsByUser } from "../../../../services/requests/Invitation/getByUserId";

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
  const [userInvitations, setUserInvitations] = useState<Invitation[]>([]);
  const [userInvitationsFiltered, setUserInvitationsFiltered] = useState<
    Invitation[]
  >([]);
  const [activeDeleteInvitation, setActiveDeleteInvitation] = useState<
    Invitation | undefined
  >(undefined);

  const { getInvitationsByUser } = useGetInvitationsByUser({
    setInvitations: setUserInvitations,
  });

  useEffect(() => {
    const filtered = userInvitations.filter(
      (invitation) => invitation.urlCollection === activeCollection?.url
    );
    setUserInvitationsFiltered(filtered);
  }, [userInvitations, activeCollection]);

  useEffect(() => {
    getInvitationsByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleDeleteInvitation = async () => {
    await deleteInvitation(activeDeleteInvitation);
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
      invitations={userInvitationsFiltered}
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
        if (activeDeleteInvitation) {
          handleDeleteInvitation();
        }
        setOpened(false);
      }}
      activeCollection={activeCollection}
      activeUser={activeUser}
      onClose={() => {
        setOpened(false);
      }}
      activeDeleteInvitation={activeDeleteInvitation}
      setActiveDeleteInvitation={setActiveDeleteInvitation}
    />
  );
}
