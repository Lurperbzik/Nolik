import { IoAddCircle } from "react-icons/io5";
import { Button, Text } from "@mantine/core";

type HeaderButtonProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export function HeaderButton({ loading, setLoading }: HeaderButtonProps) {
  return (
    <>
      <Button
        loading={loading}
        size="compact-sm"
        variant="filled"
        color="#347D39"
        radius="sm"
        rightSection={<IoAddCircle size={18} />}
        onClick={() => {
          setLoading(true);
        }}
      >
        <Text fw={600} size="md" style={{ marginTop: "2px", color: "#FFFF" }}>
          New
        </Text>
      </Button>
    </>
  );
}
