import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import "@mantine/core/styles.css";

export default function App() {
  return (
    <MantineProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </MantineProvider>
  );
}
