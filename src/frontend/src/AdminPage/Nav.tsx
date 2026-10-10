import { LogoutModalContainer } from "../components/Modal/Profile/Logout/LogoutModalContainer";

import { Button } from "@mantine/core";
import { useState } from "react";
import { useColors } from "../theme/theme.context";

export function NavAdmin() {
  const { colors } = useColors();
  const [opened, setOpened] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
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
          onClick={() => setOpened(true)}
        >
          Log Out
        </Button>
        <LogoutModalContainer opened={opened} setOpened={setOpened} />
      </div>
    </div>
  );
}
