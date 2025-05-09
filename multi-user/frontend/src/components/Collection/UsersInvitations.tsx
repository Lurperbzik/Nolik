import { useEffect, useState } from "react";
import { ActionIcon, Box, NavLink, Autocomplete } from "@mantine/core";
import { FaRegEnvelope } from "react-icons/fa";
import { PiUserCirclePlus } from "react-icons/pi";
import { User } from "../../models/User";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useCreateInvitation } from "../../services/requests/Invitation/create";

interface UsersInvitationProps {
  users: User[];
  usersNotToShow: User[];
  collectionUrl: string;
}

export function UsersInvitation({
  collectionUrl,
  usersNotToShow,
  users,
}: UsersInvitationProps) {
  const [activeUser, setActiveUser] = useState("");
  const { userId } = useAuthContext();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [request, setRequest] = useState(false);

  const { createInvitation } = useCreateInvitation({
    invitation: {
      collectionUrl,
      invitedUsername: activeUser,
    },
  });

  async function handleSubmit() {
    setRequest(true);
  }

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.id !== userId && !usersNotToShow.some((u) => u.id === user.id)
    );
    setFilteredUsers(filtered);
  }, [users, userId, usersNotToShow]);

  useEffect(() => {
    if (request) {
      createInvitation();
      setRequest(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  return (
    <>
      <Autocomplete
        data={filteredUsers.map((user) => user.username)}
        placeholder="Search user"
        style={{ width: "100%" }}
        onOptionSubmit={(value) => {
          const user = filteredUsers.find((user) => user.username === value);
          if (user) {
            setActiveUser(user.username);
          }
        }}
      />

      <Box>
        {filteredUsers.map((user) => (
          <NavLink
            key={user.id}
            label={user.username}
            active={activeUser === user.username}
            onClick={() => {
              setActiveUser(user.username);
            }}
            leftSection={<PiUserCirclePlus />}
            rightSection={
              <ActionIcon variant="subtle" onClick={() => handleSubmit()}>
                <FaRegEnvelope />
              </ActionIcon>
            }
          />
        ))}
        <hr style={{ border: "none", borderTop: "1px solid #e0e0e0" }} />
      </Box>
    </>
  );
}
