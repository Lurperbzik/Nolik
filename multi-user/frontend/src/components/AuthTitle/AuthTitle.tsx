import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Alert,
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
}

export function AuthTitle({
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
  isLoading,
  error,
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
        {error && (
          <Alert title="Error" color="red" mt="md">
            Invalid username or password
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
