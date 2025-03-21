import { IoIosFolderOpen } from 'react-icons/io';
import { Text } from '@mantine/core';
import { AddRepositoryButton } from '../AddRepositoryButton/AddRepositoryButton';

export function NavigationHeader() {
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
          Repositories
        </Text>
      </div>
      <AddRepositoryButton />
    </div>
  );
}
