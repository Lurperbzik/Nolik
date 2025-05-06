import { useState } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { NavBar } from "../NavBar/NavBar";
import { Chat } from "../Chat/Chat";

export function Home() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState("");

  return (
    <AppShell
      style={{
        height: "100vh",
      }}
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: "#f9f9f9" }}>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        style={{
          backgroundColor: "#f9f9f9",
          overflow: "auto",
          scrollbarWidth: "thin",
        }}
        p="md"
      >
        <NavBar setActiveCollectionUrl={setActive} />
      </AppShell.Navbar>
      <AppShell.Main
        style={{ height: "100%", overflow: "auto", scrollbarWidth: "thin" }}
      >
        <Chat collectionUrl={active} />
      </AppShell.Main>
    </AppShell>
  );
}
