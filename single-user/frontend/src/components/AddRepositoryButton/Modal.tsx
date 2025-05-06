import { Button, Modal, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import { RepositoryForm } from './Form';
import { Alerts } from './Alerts';
import { useCheckRepository } from '../../services/CheckRepository';
import { useAddRepository } from '../../services/AddCollection';

type ModalProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export function AddModal({ opened, setOpened }: ModalProps) {
  const [validInput, setValidInput] = useState(false);
  const [errorOwner, setErrorOwner] = useState('');
  const [errorName, setErrorName] = useState('');

  const [valueOwner, setValueOwner] = useState('');
  const [valueName, setValueName] = useState('');

  const { success, error, loading, verifyRepository } = useCheckRepository({
    owner: valueOwner,
    repo: valueName,
  });

  const { addRepository } = useAddRepository({
    owner: valueOwner,
    repo: valueName,
  });

  useEffect(() => {
    if (success) {
      addRepository();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <Modal
        opened={opened || loading}
        onClose={() => {
          setOpened(false);
          setValidInput(false);
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
            loading={loading}
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
                setValidInput(true);
                // Verify Repository
                verifyRepository();
              } else {
                setValidInput(false);
              }
            }}
          >
            Submit
          </Button>
        </div>
        {validInput && <Alerts success={success} error={error} />}
      </Modal>
    </>
  );
}
