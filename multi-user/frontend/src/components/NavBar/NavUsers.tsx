import { useEffect, useState } from "react";
import {
  Text,
  Alert,
  Box,
  Skeleton,
  Autocomplete,
  NavLink,
} from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useGetUsers } from "../../services/requests/User/get";
import { PiUserCirclePlus } from "react-icons/pi";
import { User } from "../../models/User";
import { useAuthContext } from "../../context/auth/AuthContext";

function UsersHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <FaUserCircle size="22px" color="#555" />
        <Text fw={600} size="lg" style={{ marginTop: "2px", color: "#333" }}>
          Users
        </Text>
      </div>
    </div>
  );
}

export function NavUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { loading, error, getUsers } = useGetUsers({ setUsers });
  const { userId } = useAuthContext();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.id !== userId));
  }, [users, userId]);

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <UsersHeader />
        <Alert title="Error" icon={<MdErrorOutline size={"xl"} />} color="red">
          Failed to load users, please try again later.
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <UsersHeader />
        <Box>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Box>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <UsersHeader />
      <Autocomplete
        data={filteredUsers.map((user) => user.username)}
        placeholder="Search user"
        style={{ width: "100%" }}
      />
      <Box>
        {filteredUsers.map((user) => (
          <NavLink
            key={user.id}
            label={user.username}
            leftSection={<PiUserCirclePlus />}
          />
        ))}
        <hr style={{ border: "none", borderTop: "1px solid #e0e0e0" }} />
      </Box>
    </div>
  );
}
