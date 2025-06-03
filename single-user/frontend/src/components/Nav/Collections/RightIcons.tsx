import { ActionIcon } from '@mantine/core';
import { MdDeleteForever } from 'react-icons/md';
import { PiLinkBold } from 'react-icons/pi';
import { getGitHubURL } from '../../../utils/urlHelpers';
import { useColors } from '../../../theme/theme.context';
import { Collection } from '../../../models/Collection';

type RightIconsProps = {
  collection: Collection;
  setDeleteModalOpened: (opened: boolean) => void;
};

export function RightIcons({
  collection,
  setDeleteModalOpened,
}: RightIconsProps) {
  const { colors } = useColors();
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      <ActionIcon
        variant="subtle"
        size="md"
        color={colors.iconDelete}
        onClick={() => setDeleteModalOpened(true)}
      >
        <MdDeleteForever />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        size="md"
        color={colors.iconLink}
        onClick={() => {
          const urlToOpen = getGitHubURL(collection.url, collection.platform);
          if (!urlToOpen) {
            return;
          }
          window.open(urlToOpen, '_blank');
        }}
      >
        <PiLinkBold />
      </ActionIcon>
    </div>
  );
}
