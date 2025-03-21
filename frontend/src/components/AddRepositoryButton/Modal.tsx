import { Button, Modal, Alert, Space } from '@mantine/core';
import { useState } from 'react';
import { GiInfo } from 'react-icons/gi';
import { RepositoryForm } from './Form';

type ModalProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export function AddModal({ opened, setOpened }: ModalProps) {
  const [error, setError] = useState(false);

  const [errorOwner, setErrorOwner] = useState('');
  const [errorName, setErrorName] = useState('');

  const [valueOwner, setValueOwner] = useState('');
  const [valueName, setValueName] = useState('');

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setError(false);
          setErrorOwner('');
          setErrorName('');
          setValueOwner('');
          setValueName('');
        }}
        title="Add Repository"
        size="md"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <RepositoryForm
          setErrorOwner={setErrorOwner}
          setErrorName={setErrorName}
          setValueOwner={setValueOwner}
          setValueName={setValueName}
          errorOwner={errorOwner}
          errorName={errorName}
        />
        <Space h="md" />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="lime"
            onClick={() => {
              if (valueOwner === '') {
                setErrorOwner('Owner is required');
              }
              if (valueName === '') {
                setErrorName('Name is required');
              }
              if (
                errorOwner === '' &&
                errorName === '' &&
                valueOwner !== '' &&
                valueName !== ''
              ) {
                // Aquí puedes agregar la lógica para enviar los datos
                setError(true);
              } else {
                setError(false);
              }
            }}
          >
            Submit
          </Button>
        </div>

        {error && (
          <>
            <Space h="md" />
            <Alert variant="light" color="red" title="Error" icon={<GiInfo />}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
              officiis, quae tempore necessitatibus placeat saepe.
            </Alert>
          </>
        )}
      </Modal>
    </>
  );
}
