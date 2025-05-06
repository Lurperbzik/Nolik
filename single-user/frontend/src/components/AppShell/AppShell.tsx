import { useState } from 'react';
import { Repository } from '../../models/Repositories';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Files } from './Files';
import { WebSocketComponent } from '../../services/WebSocket';

export function AppBaseShell() {
  const [opened, { toggle }] = useDisclosure();
  const [repos, setRepos] = useState<Repository[]>([]);

  const { Navlink, Conversation } = Files({ repos, setRepos });
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: '#f9f9f9' }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar style={{ backgroundColor: '#f9f9f9' }} p="md">
        {Navlink}
      </AppShell.Navbar>
      <AppShell.Main>{Conversation}</AppShell.Main>
      <WebSocketComponent setRepos={setRepos} />,
    </AppShell>
  );
}
