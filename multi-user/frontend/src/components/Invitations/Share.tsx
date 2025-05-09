import { useState } from "react";
import { ActionIcon, Modal, Text, Space } from "@mantine/core";
import { MdOutlineShare } from "react-icons/md";
import { Collection } from "../../models/Collection";
import { UsersInvitation } from "../Collection/UsersInvitations";
import { CollectionInvitations } from "../Collection/CollectionInvitations";
import { User } from "../../models/User";
import { useGetUsers } from "../../services/requests/User/get";

interface ShareCollectionProps {
  collection: Collection;
}

export function ShareCollection({ collection }: ShareCollectionProps) {
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const { getUsers } = useGetUsers({ setUsers });

  return (
    <>
      <ActionIcon
        variant="subtle"
        color="green"
        onClick={() => {
          setOpened(true);
          getUsers();
        }}
        size={"md"}
      >
        <MdOutlineShare size={16} />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text size="lg" fw="800" style={{ color: "#333" }}>
            Invitations for{" "}
            <Text component="span" c="blue" fw="800">
              {collection.name}
            </Text>
          </Text>
        }
        styles={{
          content: {
            backgroundColor: "#f9f9f9",
          },
          header: {
            backgroundColor: "#f9f9f9",
            borderBottom: "1px solid #e0e0e0",
          },
        }}
      >
        <CollectionInvitations
          users={users}
          setUsers={setInvitedUsers}
          collectionUrl={collection.url}
        />
        <Space h="lg" />
        <Text size="md" fw="600" style={{ color: "#333" }}>
          Invite new users
        </Text>
        <Space h="xs" />
        <UsersInvitation
          users={users}
          usersNotToShow={invitedUsers}
          collectionUrl={collection.url}
        />
      </Modal>
    </>
  );
}
