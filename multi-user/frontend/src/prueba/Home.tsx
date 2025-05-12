import { useState } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Navbar } from "./Navbar";
import { ChatContainer } from "./Chat/ChatContainer";
import { Collection } from "../models/Collection";

export function Home() {
  const [opened, setOpened] = useState(false);
  const [activeCollection, setActiveCollection] = useState<
    Collection | undefined
  >(undefined);

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
      )}
      <AppShell.Navbar
        style={{
          backgroundColor: "#f9f9f9",
          overflow: "auto",
          scrollbarWidth: "thin",
        }}
        p="md"
      >
        <Navbar
          activeCollection={activeCollection}
          setActiveCollection={setActiveCollection}
        />
      </AppShell.Navbar>
      <AppShell.Main
        style={{ height: "100%", overflow: "auto", scrollbarWidth: "thin" }}
      >
        <ChatContainer
          collectionUrl={activeCollection ? activeCollection.url : ""}
        />
      </AppShell.Main>
    </AppShell>
  );
}
