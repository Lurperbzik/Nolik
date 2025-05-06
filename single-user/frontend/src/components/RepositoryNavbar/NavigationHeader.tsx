import { Text } from '@mantine/core';
import { AddRepositoryButton } from '../AddRepositoryButton/AddRepositoryButton';
import { FaFolder } from 'react-icons/fa';

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
        <FaFolder size="24px" />
        <Text fw={500} size={'lg'} style={{ marginTop: '6px' }}>
          Repositories
        </Text>
      </div>
      <AddRepositoryButton />
    </div>
  );
}
