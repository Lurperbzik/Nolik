import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import "@mantine/core/styles.css";
import { ColorProvider } from "./theme/theme.context.provider";

export default function App() {
  return (
    <MantineProvider>
      <ColorProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ColorProvider>
    </MantineProvider>
  );
}
