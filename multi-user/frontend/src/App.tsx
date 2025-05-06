import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import "@mantine/core/styles.css";
import CollectionContextProvider from "./context/collections/CollectionContextProvider";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <CollectionContextProvider>
          <Router />
        </CollectionContextProvider>
      </AuthContextProvider>
    </MantineProvider>
  );
}
