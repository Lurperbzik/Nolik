import { Button, Modal, Space } from '@mantine/core';
import { useState } from 'react';
import { RepositoryForm } from './Form';
import { Alerts } from './Alerts';

type ModalProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export function AddModal({ opened, setOpened }: ModalProps) {
  const [completed, setCompleted] = useState(false);

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
          setCompleted(false);
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
            loading={completed}
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
                setCompleted(true);
              } else {
                setCompleted(false);
              }
            }}
          >
            Submit
          </Button>
        </div>
        <Alerts
          loadingButton={completed}
          setLoadingButton={setCompleted}
          owner={valueOwner}
          repo={valueName}
        />

        {/*completed && (
          <>
            <Space h="md" />
            <Alert variant="light" color="red" title="Error" icon={<GiInfo />}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
              officiis, quae tempore necessitatibus placeat saepe.
            </Alert>
          </>
        )*/}
      </Modal>
    </>
  );
}
