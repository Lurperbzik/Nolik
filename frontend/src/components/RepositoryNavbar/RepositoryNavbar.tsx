import { Skeleton, Box, Autocomplete } from '@mantine/core';
import { RepositoryNavLink } from './RepositoryNavLink';
import { NavigationHeader } from './NavigationHeader';
import { RepoProps } from '../AppShell/Files';

type NavLinkProps = {
  repos: RepoProps[] | undefined;
  active: string;
  setActive: (value: string) => void;
};

export function RepositoryNavbar({ repos, active, setActive }: NavLinkProps) {
  if (!repos) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavigationHeader />
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
      <NavigationHeader />
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
          <RepositoryNavLink
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
