import { Text, Card } from "@mantine/core";
import { useColors } from "../../theme/theme.context";

type UserInputProps = {
  message: string;
};

export function UserInput({ message }: UserInputProps) {
  const { colors } = useColors();
  message = message.trim();
  if (message === "") {
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Card
        withBorder
        radius="lg"
        style={{
          backgroundColor: colors.userMessage,
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
      </Card>
    </div>
  );
}
