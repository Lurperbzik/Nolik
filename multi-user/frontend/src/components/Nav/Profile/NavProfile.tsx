import { Header } from "../Nav";
import { PiGearFill } from "react-icons/pi";
import { IconType } from "react-icons";
import { Button, Collapse } from "@mantine/core";
import { useState } from "react";
import { ApiKeyModalContainer } from "../../Modal/Profile/ApiKey/ApiKeyModalContainer";
import { PasswordModalContainer } from "../../Modal/Profile/Password/PasswordModalContanier";
import { useColors } from "../../../theme/theme.context";
import { LogoutModalContainer } from "../../Modal/Profile/Logout/LogoutModalContainer";

const NavProfileData: {
  headerTitle: string;
  Icon: IconType;
} = {
  headerTitle: "Settings",
  Icon: PiGearFill,
};

export function NavProfile() {
  const { colors } = useColors();
  const [opened, setOpened] = useState(false);
  const [apiKeyModalOpened, setApiKeyModalOpened] = useState(false);
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Button
        variant="default"
        size="xs"
        leftSection={
          <div
            style={{
              scale: "0.9",
            }}
          >
            <Header
              title={NavProfileData.headerTitle}
              Icon={NavProfileData.Icon}
            />
          </div>
        }
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
        onClick={() => setOpened((o) => !o)}
      ></Button>
      <Collapse in={opened} transitionDuration={10}>
        <div
          style={{
            backgroundColor: colors.backgroundPrimary,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            scale: "0.9",
          }}
        >
          <Button
            variant="outline"
            color={colors.changeApiKeyButton}
            style={{ width: "100%" }}
            onClick={() => setApiKeyModalOpened(true)}
          >
            Change API Key
          </Button>
          <ApiKeyModalContainer
            opened={apiKeyModalOpened}
            setOpened={setApiKeyModalOpened}
          />
          <Button
            variant="outline"
            color={colors.changePasswordButton}
            style={{ width: "100%" }}
            onClick={() => setPasswordModalOpened(true)}
          >
            Change Password
          </Button>
          <PasswordModalContainer
            opened={passwordModalOpened}
            setOpened={setPasswordModalOpened}
          />
          <Button
            variant="outline"
            color={colors.logoutButton}
            style={{ width: "100%" }}
            onClick={() => {
              setLogoutModalOpened(true);
            }}
          >
            Logout
          </Button>
          <LogoutModalContainer
            opened={logoutModalOpened}
            setOpened={setLogoutModalOpened}
          />
        </div>
      </Collapse>
    </div>
  );
}
