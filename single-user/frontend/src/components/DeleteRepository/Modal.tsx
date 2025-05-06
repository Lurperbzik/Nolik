import { Button, Modal, Text, Space } from '@mantine/core';
import { useDeleteCollection } from '../../services/DeleteRepository';

export function DeleteRepositoryModal({
  opened,
  onClose,
  repoName,
  url,
}: {
  opened: boolean;
  onClose: () => void;
  repoName: string;
  url: string;
}) {
  const { handleDelete } = useDeleteCollection();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="bold">
          Delete Repository
        </Text>
      }
      centered
      fw="bold"
    >
      <Text style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        Are you sure you want to delete{' '}
        <Text component="span" c="blue" fw="bold">
          {repoName}
        </Text>{' '}
        repository?
      </Text>
      <Space h="md" />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="filled"
          color="red"
          onClick={() => {
            handleDelete(url);
            onClose();
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
