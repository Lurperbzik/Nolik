import { useState, useEffect } from "react";
import { useGetUsers } from "../services/requests/User/get";
import { NavBarItem } from "../components/Nav/Nav";
import { User } from "../models/User";
import { PiUserCirclePlus } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { ActionIcon, Button } from "@mantine/core";
import { IoPersonAdd } from "react-icons/io5";
import { DeleteUserModalContainer } from "./DeleteUser/DeleteModalContainer";
import { WebSocketListener } from "../services/WebSocket";
import { AddUserModalContainer } from "./AddUser/AddModalContainer";

export function Main() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [addUserModalOpened, setAddUserModalOpened] = useState<boolean>(false);

  const { getUsers, loading, error } = useGetUsers({ setUsers: setUsers });

  const leftIcons = users.map((user) => {
    return <PiUserCirclePlus key={user.id} />;
  });

  const rightIcons = users.map((user) => {
    return (
      <ActionIcon
        variant="subtle"
        size="md"
        color="black"
        onClick={() => setDeleteModalOpened(true)}
      >
        <MdDeleteForever key={user.id} />
      </ActionIcon>
    );
  });

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSocketListener setUsers={setUsers}>
      <NavBarItem
        active={activeUser}
        activeColorNavlink={true}
        autocomplete={true}
        autocompletePlaceholder="Search users..."
        data={users}
        error={error}
        loading={loading}
        setActive={setActiveUser}
        navlinkKeyField="id"
        navlinkValueField="username"
        leftElement={leftIcons}
        loadingIcon={[]}
        rightElement={rightIcons}
      />
      <Button
        variant="outline"
        style={{ width: "100%" }}
        onClick={() => setAddUserModalOpened(true)}
      >
        <IoPersonAdd size={20} style={{ marginRight: 8 }} />
        Add User
      </Button>
      <DeleteUserModalContainer
        opened={deleteModalOpened}
        setOpened={setDeleteModalOpened}
        user={activeUser}
      />
      <AddUserModalContainer
        users={users}
        opened={addUserModalOpened}
        setOpened={setAddUserModalOpened}
      />
    </WebSocketListener>
  );
}
