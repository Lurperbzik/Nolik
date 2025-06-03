import { IoAddCircle } from "react-icons/io5";
import { Button, Text } from "@mantine/core";
import { CreateModalContainer } from "../../Modal/Collections/Create/CreateModalContainer";
import { useColors } from "../../../theme/theme.context";

type HeaderButtonProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export function HeaderButton({ loading, setLoading }: HeaderButtonProps) {
  const { colors } = useColors();
  return (
    <>
      <Button
        loading={loading}
        size="compact-sm"
        variant="filled"
        color={colors.newCollectionButton}
        radius="sm"
        rightSection={<IoAddCircle size={18} />}
        onClick={() => {
          setLoading(true);
        }}
      >
        <Text
          fw={600}
          size="md"
          style={{ marginTop: "2px", color: colors.newCollectionText }}
        >
          New
        </Text>
      </Button>
      <CreateModalContainer opened={loading} setOpened={setLoading} />
    </>
  );
}
