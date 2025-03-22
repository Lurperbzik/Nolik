import { Text, Divider } from '@mantine/core';

type UserInputProps = {
  message: string;
  key: number;
};

export function UserInput({ message, key }: UserInputProps) {
  message = message.trim();
  if (message === '') {
    return null;
  }

  return (
    <div key={key}>
      <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
      <Divider my="md" />
    </div>
  );
}
