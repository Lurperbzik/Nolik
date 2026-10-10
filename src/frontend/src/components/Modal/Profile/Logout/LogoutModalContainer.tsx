import { LogoutModal } from "./LogoutModal";
import { useLogout } from "../../../../services/requests/logout";
import { Dispatch, SetStateAction } from "react";

type LogoutModalContainerProps = {
  setOpened: Dispatch<SetStateAction<boolean>>;
  opened: boolean;
};

export function LogoutModalContainer({
  setOpened,
  opened,
}: LogoutModalContainerProps) {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <LogoutModal opened={opened} setOpened={setOpened} onClick={handleLogout} />
  );
}
