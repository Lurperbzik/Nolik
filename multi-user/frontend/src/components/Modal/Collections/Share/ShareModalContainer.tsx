import { useState, useEffect } from "react";
import { ShareCollectionModal } from "./ShareModal";
import { deleteInvitation } from "../../../../services/requests/Invitation/delete";
import { useCreateInvitation } from "../../../../services/requests/Invitation/create";
import { User } from "../../../../models/User";
import { Invitation, ShortInvitation } from "../../../../models/Invitation";
import { Collection } from "../../../../models/Collection";
import { useAuthContext } from "../../../../context/auth/AuthContext";

interface ShareCollectionModalContainerProps {
  users: User[];
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  activeCollection: Collection | undefined;
  userInvitations: Invitation[];
}

export function ShareCollectionModalContainer({
  users,
  opened,
  setOpened,
  activeCollection,
  userInvitations,
}: ShareCollectionModalContainerProps) {
  const [activeInvitation, setActiveInvitation] = useState<
    ShortInvitation | undefined
  >(undefined);
  const [userInvitationsFiltered, setUserInvitationsFiltered] = useState<
    Invitation[]
  >([]);
  const [activeDeleteInvitation, setActiveDeleteInvitation] = useState<
    Invitation | undefined
  >(undefined);

  const [usersNotInvited, setUsersNotInvited] = useState<User[]>([]);
  const [activeUserNotInvited, setActiveUserNotInvited] = useState<
    User | undefined
  >(undefined);
  const { userId } = useAuthContext();

  useEffect(() => {
    const invitationsByCollection = userInvitations.filter(
      (invitation) => invitation.urlCollection === activeCollection?.url
    );
    const invitedUserIds = invitationsByCollection.map(
      (inv) => inv.invitedUserId
    );
    const filtered = users.filter((user) => !invitedUserIds.includes(user.id));
    setUsersNotInvited(filtered);
  }, [userInvitations, activeUserNotInvited, users, activeCollection]);

  useEffect(() => {
    const filtered = userInvitations.filter(
      (invitation) => invitation.urlCollection === activeCollection?.url
    );
    setUserInvitationsFiltered(filtered);
  }, [userInvitations, activeCollection]);

  useEffect(() => {
    if (activeUserNotInvited && activeCollection) {
      const newInvitation: ShortInvitation = {
        collectionUrl: activeCollection.url,
        invitedUserId: activeUserNotInvited.id,
        invitedByUserId: userId ? userId : -1,
      };
      setActiveInvitation(newInvitation);
    }
  }, [activeCollection, activeUserNotInvited, userId]);

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
      users={usersNotInvited}
      setActiveUser={setActiveUserNotInvited}
      opened={opened}
      onClickBottomCreateInvitation={() => {
        if (activeUserNotInvited) {
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
      activeUser={activeUserNotInvited}
      onClose={() => {
        setOpened(false);
      }}
      activeDeleteInvitation={activeDeleteInvitation}
      setActiveDeleteInvitation={setActiveDeleteInvitation}
    />
  );
}
