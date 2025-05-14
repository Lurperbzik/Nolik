import { useEffect } from "react";
import { useState } from "react";
import { Space } from "@mantine/core";
import { CollectionsView } from "./Views/CollectionsView";
import { NavUsers } from "./Nav/Users/NavUsers";
import { InvitationsView } from "./Views/InvitationsView";
import { useGetCollections } from "../services/requests/Collection/get";
import { useGetUsers } from "../services/requests/User/get";
import { useGetInvitations } from "../services/requests/Invitation/get";
import { Collection } from "../models/Collection";
import { User } from "../models/User";
import { Invitation } from "../models/Invitation";
import { WebSocketListener } from "../services/WebSocket";
import { useAuthContext } from "../context/auth/AuthContext";

interface NavbarProps {
  activeCollection: Collection | undefined;
  setActiveCollection: React.Dispatch<
    React.SetStateAction<Collection | undefined>
  >;
}

export function Navbar({ activeCollection, setActiveCollection }: NavbarProps) {
  const { userId } = useAuthContext();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredInvitedUsers, setFilteredInvitedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [collectionInvitations, setCollectionInvitations] = useState<
    Invitation[]
  >([]);

  const { getCollections } = useGetCollections({
    setCollections,
  });

  const { getUsers } = useGetUsers({
    setUsers,
  });

  const { getInvitations } = useGetInvitations({
    setInvitations,
  });

  useEffect(() => {
    const filtered = users.filter((user) => user.id !== userId);
    setFilteredUsers(filtered);
  }, [users, userId]);

  useEffect(() => {
    const invitedUserIds = invitations.map((inv) => inv.invitedUserId);
    const filtered = users.filter(
      (user) => user.id !== userId && !invitedUserIds.includes(user.id)
    );
    setFilteredInvitedUsers(filtered);
  }, [invitations, userId, users]);

  useEffect(() => {
    getCollections();
    getUsers();
    getInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSocketListener
      setCollections={setCollections}
      setInvitations={setInvitations}
      setCollectionInvitations={setCollectionInvitations}
      setUsers={setUsers}
    >
      <CollectionsView
        collections={collections}
        users={filteredInvitedUsers}
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
      />
      <Space h="md" />
      <NavUsers users={filteredUsers} />
      <Space h="md" />
      <InvitationsView invitations={invitations} />
    </WebSocketListener>
  );
}
