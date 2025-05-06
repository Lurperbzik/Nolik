import { useState } from 'react';
import { NavLink, ActionIcon, Loader } from '@mantine/core';
import { PiLinkBold } from 'react-icons/pi';
import { PlatformIcon } from './PlatformIcon';
import { getURL } from '../../utils/urlHelpers';
import { Repository } from '../../models/Repositories';
import { MdDeleteForever } from 'react-icons/md';
import { DeleteRepositoryModal } from '../DeleteRepository/Modal';

type RepositoryNavLinkProps = Repository & {
  onClick: () => void;
  active: boolean;
};

export function RepositoryNavLink({
  name,
  platform,
  url,
  status,
  onClick,
  active,
}: RepositoryNavLinkProps) {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  if (status === 'completed') {
    return (
      <>
        <DeleteRepositoryModal
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          repoName={name}
          url={url}
        />
        <NavLink
          label={name}
          onClick={onClick}
          active={active}
          leftSection={<PlatformIcon platform={platform} />}
          rightSection={
            <div style={{ display: 'flex', gap: '4px' }}>
              <ActionIcon
                variant="subtle"
                size="md"
                color="red"
                onClick={() => setDeleteModalOpened(true)}
              >
                <MdDeleteForever />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                size="md"
                onClick={() => {
                  const urlToOpen = getURL(url, platform);
                  if (!urlToOpen) {
                    return;
                  }
                  window.open(urlToOpen, '_blank');
                }}
              >
                <PiLinkBold />
              </ActionIcon>
            </div>
          }
        />
      </>
    );
  } else {
    return (
      <NavLink
        disabled
        label={name}
        active={false}
        leftSection={<PlatformIcon platform={platform} />}
        rightSection={<Loader color="blue" size="sm" />}
      />
    );
  }
}
