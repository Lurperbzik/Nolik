import { TextInput, Fieldset, Stack } from "@mantine/core";
import { useColors } from "../../theme/theme.context";

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
  const { colors } = useColors();
  const { errorOwner, errorName } = errors;
  const { setValueOwner, setValueName, setErrorOwner, setErrorName } = handlers;

  return (
    <Fieldset
      legend="📦 Collection"
      radius="xs"
      style={{
        border: "1px solid " + colors.line,
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
      }}
      styles={{
        legend: {
          fontWeight: 600,
          fontSize: 18,
          color: colors.titleText,
        },
      }}
    >
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
