import { useState } from 'react';
import { Button } from '@mantine/core';
import { IoAddCircle } from 'react-icons/io5';
import { AddModal } from './Modal';

export function AddRepositoryButton() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        loading={loading}
        size="compact-sm"
        variant="filled"
        color="lime"
        radius="lg"
        rightSection={<IoAddCircle size={20} />}
        onClick={() => {
          setLoading(true);
        }}
      >
        Add
      </Button>
      <AddModal opened={loading} setOpened={setLoading} />
    </>
  );
}
