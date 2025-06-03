import {
  Button,
  Fieldset,
  Group,
  Modal,
  NativeSelect,
  TextInput,
} from "@mantine/core";
import { useColors } from "../../../theme/theme.context";

export interface formProps {
  opened: boolean;
  checked: boolean;
  form: {
    limit: number;
    requiredWords: string[];
    acceptedDeviation: number;
    minNumComments: number;
    state: string;
  };
}
type ModalOptionsProps = {
  form: formProps;
  setForm: React.Dispatch<React.SetStateAction<formProps>>;
};
export function ModalOptions({ form, setForm }: ModalOptionsProps) {
  const { colors } = useColors();
  return (
    <Modal
      opened={form.opened}
      onClose={() => setForm({ ...form, opened: false })}
      title="Advanced search options"
      size="lg"
      overlayProps={{
        opacity: 0.55,
      }}
    >
      <Fieldset
        legend="Options"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextInput
          label="Limit"
          description="Maximum number of issues to retrieve"
          placeholder="Limit"
          value={
            form.form.limit === null || isNaN(form.form.limit)
              ? ""
              : form.form.limit
          }
          onChange={(e) =>
            setForm({
              ...form,
              form: {
                ...form.form,
                limit: e.target.value === "" ? 0 : parseInt(e.target.value),
              },
            })
          }
        />
        <TextInput
          label="Required words"
          description="List of words separated by comma of which at least one must be present in the Issue title, body or comments"
          placeholder="Required words"
          value={form.form.requiredWords.join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              form: {
                ...form.form,
                requiredWords: e.target.value
                  .split(", ")
                  .map((word) => word.trim()),
              },
            })
          }
        />
        <TextInput
          label="Accepted deviation"
          description="Maximum accepted deviation in the results"
          placeholder="Accepted deviation"
          value={
            form.form.acceptedDeviation === null ||
            isNaN(form.form.acceptedDeviation)
              ? ""
              : form.form.acceptedDeviation
          }
          onChange={(e) =>
            setForm({
              ...form,
              form: {
                ...form.form,
                acceptedDeviation:
                  e.target.value === "" ? 0 : parseInt(e.target.value),
              },
            })
          }
        />
        <TextInput
          label="Minimum number of comments"
          description="Minimum number of comments in the issue"
          placeholder="Minimum number of comments"
          value={
            form.form.minNumComments === null || isNaN(form.form.minNumComments)
              ? ""
              : form.form.minNumComments
          }
          onChange={(e) =>
            setForm({
              ...form,
              form: {
                ...form.form,
                minNumComments:
                  e.target.value === "" ? 0 : parseInt(e.target.value),
              },
            })
          }
        />
        <NativeSelect
          label="State"
          description="State of the issue (open, closed, all)"
          value={form.form.state}
          data={["open", "closed", "all"]}
          onChange={(e) =>
            setForm({
              ...form,
              form: { ...form.form, state: e.target.value },
            })
          }
        />
      </Fieldset>
      <Group mt="lg" justify="flex-end">
        <Button
          onClick={() => setForm({ ...form, opened: false, checked: true })}
          variant="filled"
          color={colors.advancedSearchButton}
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  );
}
