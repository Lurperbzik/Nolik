import { TextInput, Fieldset } from '@mantine/core';

type FormProps = {
  setErrorOwner: (value: string) => void;
  setErrorName: (value: string) => void;
  setValueOwner: (value: string) => void;
  setValueName: (value: string) => void;
  errorOwner: string;
  errorName: string;
};

export function RepositoryForm({
  setErrorOwner,
  setErrorName,
  setValueOwner,
  setValueName,
  errorOwner,
  errorName,
}: FormProps) {
  return (
    <Fieldset legend="Repository">
      <TextInput
        placeholder="Owner"
        withAsterisk
        label="Owner"
        error={errorOwner}
        onChange={(event) => {
          setValueOwner(event.currentTarget.value);
          setErrorOwner('');
        }}
      />
      <TextInput
        placeholder="Name"
        mt="md"
        withAsterisk
        label="Name"
        error={errorName}
        onChange={(event) => {
          setValueName(event.currentTarget.value);
          setErrorName('');
        }}
      />
    </Fieldset>
  );
}
