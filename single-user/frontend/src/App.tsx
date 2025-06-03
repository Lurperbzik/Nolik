import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ColorProvider } from './theme/theme.context.provider';
import { Home } from './components/Home';

function App() {
  return (
    <MantineProvider>
      <ColorProvider>
        <Home />
      </ColorProvider>
    </MantineProvider>
  );
}

export default App;
