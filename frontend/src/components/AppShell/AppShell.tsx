import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Files } from './Navbar/Repositories/Files';
export function AppBaseShell() {
  const [opened, { toggle }] = useDisclosure();
  const { Navlink, Conversation } = Files();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">{Navlink}</AppShell.Navbar>
      <AppShell.Main>{Conversation}</AppShell.Main>
    </AppShell>
  );
}
