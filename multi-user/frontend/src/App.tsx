import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import "@mantine/core/styles.css";
import CollectionContextProvider from "./context/collections/CollectionContextProvider";
import { Home } from "./prueba/Home";
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Home />
    </MantineProvider>
  );
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
