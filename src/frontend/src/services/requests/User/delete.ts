import { HookService } from "../../HookService";
import { User } from "../../../models/User";

type deleteUserProps = {
  user: User | undefined;
};

export const useDeleteUser = ({ user }: deleteUserProps) => {
  let username = "";
  if (user) {
    username = user.username;
  }
  const { loading, error, request } = HookService({
    request: {
      path: `/users/${username}`,
      method: "DELETE",
      body: JSON.stringify(user),
    },
  });

  const deleteUser = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, deleteUser };
};
