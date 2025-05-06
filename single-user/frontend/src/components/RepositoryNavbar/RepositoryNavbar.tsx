import { Skeleton, Box, Autocomplete, Alert } from '@mantine/core';
import { RepositoryNavLink } from './RepositoryNavLink';
import { NavigationHeader } from './NavigationHeader';
import { MdErrorOutline } from 'react-icons/md';
import { Repository } from '../../models/Repositories';

type NavLinkProps = {
  repos: Repository[];
  active: string;
  loadingCollections: boolean;
  errorCollections: string | null;
  setActive: (value: string) => void;
};

export function RepositoryNavbar({
  repos,
  loadingCollections,
  errorCollections,
  active,
  setActive,
}: NavLinkProps) {
  if (errorCollections) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavigationHeader />
        <Alert title="Error" icon={<MdErrorOutline size={'xl'} />} color="red">
          {errorCollections}
        </Alert>
      </div>
    );
  }
  if (loadingCollections) {
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

  repos = repos.sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return -1;
    if (b.status === 'completed' && a.status !== 'completed') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
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
            key={repo.url}
            {...repo}
            onClick={() => setActive(repo.name)}
            active={active === repo.name}
          />
        ))}
      </Box>
    </div>
  );
}
