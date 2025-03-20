import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AppBaseShell } from './components/AppShell/AppShell';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AppBaseShell />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
