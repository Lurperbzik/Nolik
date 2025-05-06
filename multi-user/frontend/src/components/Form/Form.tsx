import { TextInput, Fieldset, Stack } from "@mantine/core";
import classes from "./Form.module.css";

type Props = {
  errors: { errorOwner: string; errorName: string };
  handlers: {
    setValueOwner: (val: string) => void;
    setValueName: (val: string) => void;
    setErrorOwner: (val: string) => void;
    setErrorName: (val: string) => void;
  };
};

export function Form({ errors, handlers }: Props) {
  const { errorOwner, errorName } = errors;
  const { setValueOwner, setValueName, setErrorOwner, setErrorName } = handlers;

  return (
    <Fieldset legend="📦 Collection" className={classes.fieldset} radius="xs">
      <Stack>
        <TextInput
          placeholder="Owner name"
          withAsterisk
          label="Owner"
          size="md"
          radius="xs"
          variant="filled"
          error={errorOwner}
          onChange={(e) => {
            setValueOwner(e.currentTarget.value);
            setErrorOwner("");
          }}
        />
        <TextInput
          placeholder="Collection name"
          withAsterisk
          label="Collection name"
          size="md"
          radius="xs"
          variant="filled"
          error={errorName}
          onChange={(e) => {
            setValueName(e.currentTarget.value);
            setErrorName("");
          }}
        />
      </Stack>
    </Fieldset>
  );
}
