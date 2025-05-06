import { Text, Card } from "@mantine/core";

type UserInputProps = {
  message: string;
};

export function UserInput({ message }: UserInputProps) {
  message = message.trim();
  if (message === "") {
    return null;
  }

  return (
    <Card withBorder radius="xs" style={{ backgroundColor: "#dddddd" }}>
      <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
    </Card>
  );
}
