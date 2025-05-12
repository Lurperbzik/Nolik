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
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Card
        withBorder
        radius="lg"
        style={{
          backgroundColor: "#dddddd",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
      </Card>
    </div>
  );
}
