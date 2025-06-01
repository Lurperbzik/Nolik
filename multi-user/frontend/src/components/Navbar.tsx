import { useEffect } from "react";
import { useState } from "react";
import { Space } from "@mantine/core";
import { CollectionsView } from "./Views/CollectionsView";
import { NavUsers } from "./Nav/Users/NavUsers";
import { InvitationsView } from "./Views/InvitationsView";
import { useGetCollections } from "../services/requests/Collection/get";
import { useGetUsers } from "../services/requests/User/get";
import { useGetSentInvitations } from "../services/requests/Invitation/getSent";
import { useGetReceivedInvitations } from "../services/requests/Invitation/getReceived";
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
  const [receivedInvitations, setReceivedInvitations] = useState<Invitation[]>(
    []
  );
  const [sentInvitations, setSentInvitations] = useState<Invitation[]>([]);

  const { getCollections } = useGetCollections({
    setCollections,
  });

  const { getUsers } = useGetUsers({
    setUsers,
  });

  const { getReceivedInvitations } = useGetReceivedInvitations({
    setReceivedInvitations,
  });

  const { getSentInvitations } = useGetSentInvitations({
    setSentInvitations,
  });

  useEffect(() => {
    const filtered = users.filter((user) => user.id !== userId);
    setFilteredUsers(filtered);
  }, [users, userId]);

  useEffect(() => {
    const invitedUserIds = sentInvitations.map((inv) => inv.invitedUserId);
    const filtered = users.filter(
      (user) => user.id !== userId && !invitedUserIds.includes(user.id)
    );
    setFilteredInvitedUsers(filtered);
  }, [sentInvitations, userId, users]);

  useEffect(() => {
    getCollections();
    getUsers();
    getReceivedInvitations();
    getSentInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSocketListener
      setCollections={setCollections}
      setSentInvitations={setSentInvitations}
      setReceivedInvitations={setReceivedInvitations}
      setUsers={setUsers}
    >
      <CollectionsView
        collections={collections}
        users={filteredInvitedUsers}
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        userInvitations={sentInvitations}
      />
      <Space h="md" />
      <NavUsers users={filteredUsers} />
      <Space h="md" />
      <InvitationsView invitations={receivedInvitations} />
    </WebSocketListener>
  );
}
