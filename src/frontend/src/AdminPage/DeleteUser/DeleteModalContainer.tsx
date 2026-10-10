import { DeleteUserModal } from "./DeleteModal";
import { User } from "../../models/User";
import { useDeleteUser } from "../../services/requests/User/delete";

interface DeleteUserModalContainerProps {
  user: User | undefined;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export function DeleteUserModalContainer({
  user,
  opened,
  setOpened,
}: DeleteUserModalContainerProps) {
  const { deleteUser } = useDeleteUser({
    user: user,
  });

  const handleDelete = async () => {
    const success = await deleteUser();
    if (success) {
      setOpened(false);
    }
  };

  return (
    <DeleteUserModal
      user={user}
      opened={opened}
      onClickBottom={handleDelete}
      onClose={() => setOpened(false)}
    />
  );
}
