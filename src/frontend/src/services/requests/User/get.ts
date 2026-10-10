import { HookService } from "../../HookService";
import { User } from "../../../models/User";

type getUsersProps = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const useGetUsers = ({ setUsers }: getUsersProps) => {
  const { loading, error, request } = HookService({
    request: {
      path: "/users",
      method: "GET",
    },
    setData: setUsers,
  });

  const getUsers = async () => {
    const succes = await request();
    return succes;
  };

  return { loading, error, getUsers };
};
