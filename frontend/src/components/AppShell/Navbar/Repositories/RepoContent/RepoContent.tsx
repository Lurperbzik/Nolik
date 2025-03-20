import {
  NavLink,
  Skeleton,
  ActionIcon,
  Text,
  Box,
  Autocomplete,
  Button,
} from '@mantine/core';
import { IoLogoGithub, IoAddSharp } from 'react-icons/io5';
import { SiJirasoftware } from 'react-icons/si';
import { PiLinkBold } from 'react-icons/pi';
import { IoIosFolderOpen } from 'react-icons/io';
import { RepoProps, NavLinkProps } from '../Files';

interface IconProps {
  plataform: string;
}

type CustomNavLinkProps = RepoProps & {
  onClick: () => void;
  active: boolean;
};

function getURL(url: string, plataform: string): string {
  let github_url: string = '';
  console.log('Estoy aqui: ', plataform);
  switch (plataform) {
    case 'Github': {
      const userRepo = url.split('/repos/')[1];
      github_url = 'https://github.com/' + userRepo;
      console.log('Github: ', github_url);
      break;
    }
    default: {
      github_url = url;
      break;
    }
  }
  return github_url;
}

function Icon({ plataform }: IconProps) {
  switch (plataform) {
    case 'Github':
      return <IoLogoGithub />;
    case 'Jira':
      return <SiJirasoftware />;
    default:
      return null;
  }
}

function CustomNavLink({
  name,
  plataform,
  url,
  onClick,
  active,
}: CustomNavLinkProps) {
  return (
    <NavLink
      label={name}
      onClick={onClick}
      active={active}
      leftSection={<Icon plataform={plataform} />}
      rightSection={
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={() => {
            const urlToOpen = getURL(url, plataform);
            window.open(urlToOpen, '_blank');
          }}
        >
          <PiLinkBold />
        </ActionIcon>
      }
    />
  );
}

function Header() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <IoIosFolderOpen size="24px" />
        <Text fw={500} size={'lg'} style={{ paddingTop: 6 }}>
          Repositiories
        </Text>
      </div>
      <Button size="xs" variant="filled" color="lime" radius="xl">
        Add
        <IoAddSharp />
      </Button>
    </div>
  );
}

export function Repositories({ repos, active, setActive }: NavLinkProps) {
  if (!repos) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Header />
        <Box>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Box>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Header />
      <Autocomplete
        data={repos.map((repo) => repo.name)}
        placeholder="Search repository"
        style={{ width: '100%' }}
        onOptionSubmit={(value) => {
          setActive(value);
        }}
      />
      <Box>
        {repos.map((repo) => (
          <CustomNavLink
            key={repo.name}
            {...repo}
            onClick={() => setActive(repo.name)}
            active={active === repo.name}
          />
        ))}
      </Box>
    </div>
  );
}
