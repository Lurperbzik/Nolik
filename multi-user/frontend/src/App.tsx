import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import AuthContextProvider from "./context/auth/AuthContextProvider";
import "@mantine/core/styles.css";
import CollectionContextProvider from "./context/collections/CollectionContextProvider";

export default function App() {
  return (
    <MantineProvider>
      <AuthContextProvider>
        <CollectionContextProvider>
          <Router />
        </CollectionContextProvider>
      </AuthContextProvider>
    </MantineProvider>
  );
}
