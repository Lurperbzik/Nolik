import { useEffect, useState } from "react";
import { ActionIcon, Box, NavLink, Text, Group } from "@mantine/core";
import { GoXCircle } from "react-icons/go";
import { PiUserCirclePlus } from "react-icons/pi";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useGetInvitationsByCollection } from "../../services/requests/Invitation/getByCollection";
import { CollectionInvitation } from "../../models/Invitation";
import { User } from "../../models/User";
import { deleteInvitation } from "../../services/requests/Invitation/delete";

interface CollectionInvitationsProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  collectionUrl: string;
}

export function CollectionInvitations({
  collectionUrl,
  users,
  setUsers,
}: CollectionInvitationsProps) {
  const [invitations, setInvitations] = useState<CollectionInvitation[]>([]);
  const { getInvitationsByCollection } = useGetInvitationsByCollection({
    setInvitations,
    collectionUrl: collectionUrl,
  });
  const { userId } = useAuthContext();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    getInvitationsByCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const invitedUserIds = invitations.map((inv) => inv.invitedUserId);

    const filtered = users.filter(
      (user) => user.id !== userId && invitedUserIds.includes(user.id)
    );

    setFilteredUsers(filtered);
    setUsers(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitations, userId]);

  if (filteredUsers.length === 0) {
    return null;
  }
  return (
    <Box>
      {filteredUsers.map((user) => (
        <NavLink
          key={user.id}
          label={user.username}
          leftSection={<PiUserCirclePlus />}
          rightSection={
            <Group>
              {invitations.find((inv) => inv.invitedUserId === user.id)
                ?.status === "pending" ? (
                <Text color="orange" size="sm">
                  {" "}
                  Pending{" "}
                </Text>
              ) : (
                <Text color="green" size="sm">
                  {" "}
                  Accepted
                </Text>
              )}
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => {
                  const invitation = invitations.find(
                    (inv) => inv.invitedUserId === user.id
                  );
                  if (invitation) {
                    deleteInvitation(invitation);
                  }
                }}
              >
                <GoXCircle />
              </ActionIcon>
            </Group>
          }
        />
      ))}
      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0" }} />
    </Box>
  );
}
