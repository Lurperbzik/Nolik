import { useState } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useColors } from "../theme/theme.context";
import { Main } from "./Main";
import { NavAdmin } from "./Nav";

export function Home() {
  const { colors } = useColors();
  const [opened, setOpened] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell
      style={{ height: "100vh" }}
      header={{ height: isMobile ? 60 : 0 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {isMobile && (
        <AppShell.Header style={{ backgroundColor: colors.backgroundPrimary }}>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
      )}
      <AppShell.Navbar
        style={{
          backgroundColor: colors.backgroundPrimary,
          overflow: "auto",
          scrollbarWidth: "thin",
          display: "flex",
          flexDirection: "column",
        }}
        p="md"
      >
        <NavAdmin />
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          height: "100%",
          overflow: "auto",
          scrollbarWidth: "thin",
          backgroundColor: colors.backgroundSecondary,
        }}
      >
        <Main />
      </AppShell.Main>
    </AppShell>
  );
}
