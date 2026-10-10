import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Alert,
  Anchor,
  Space,
} from "@mantine/core";
import classes from "./AuthTitle.module.css";

interface AuthTitleProps {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: boolean;
  onSubmitAdmin: () => void;
}

export function AuthTitle({
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
  isLoading,
  error,
  onSubmitAdmin,
}: AuthTitleProps) {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="Your username"
          required
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
        <Button fullWidth mt="xl" onClick={onSubmit} loading={isLoading}>
          Sign in
        </Button>
        <Space h="md" />
        <Anchor onClick={onSubmitAdmin}>Log in to administration panel</Anchor>
        {error && (
          <Alert title="Error" color="red" mt="md">
            Invalid username or password
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
