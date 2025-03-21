import { NavLink, ActionIcon } from '@mantine/core';
import { PiLinkBold } from 'react-icons/pi';
import { PlatformIcon } from './PlatformIcon';
import { getURL } from '../../utils/urlHelpers';
import { RepoProps } from '../AppShell/Files';

type RepositoryNavLinkProps = RepoProps & {
  onClick: () => void;
  active: boolean;
};

export function RepositoryNavLink({
  name,
  platform,
  url,
  onClick,
  active,
}: RepositoryNavLinkProps) {
  return (
    <NavLink
      label={name}
      onClick={onClick}
      active={active}
      leftSection={<PlatformIcon platform={platform} />}
      rightSection={
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={() => {
            const urlToOpen = getURL(url, platform);
            window.open(urlToOpen, '_blank');
          }}
        >
          <PiLinkBold />
        </ActionIcon>
      }
    />
  );
}
