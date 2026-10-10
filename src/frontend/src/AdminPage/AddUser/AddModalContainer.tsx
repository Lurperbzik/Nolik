import { useCreateUser } from "../../services/requests/User/create";
import { AddModal } from "./AddModal";
import { useState } from "react";
import { User } from "../../models/User";

interface AddUserModalContainerProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  users: User[];
}

export function AddUserModalContainer({
  opened,
  setOpened,
  users,
}: AddUserModalContainerProps) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { createUser, loading, error } = useCreateUser({
    username: name,
    password: password,
  });

  const handleAdd = async () => {
    const success = await createUser();
    if (success) {
      setOpened(false);
    }
  };

  return (
    <AddModal
      error={error}
      handleSubmit={handleAdd}
      loading={loading}
      name={name}
      opened={opened}
      password={password}
      setName={setName}
      setPassword={setPassword}
      setOpened={setOpened}
      users={users}
    />
  );
}
