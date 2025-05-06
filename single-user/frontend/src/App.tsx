import '@mantine/core/styles.css';
import { AppBaseShell } from './components/AppShell/AppShell';
import './App.css';
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#efedff',
  '#dad7fc',
  '#b1abf1',
  '#867de7',
  '#6256de',
  '#4b3ed9',
  '#3f31d8',
  '#3124c0',
  '#291fad',
  '#1f1a99',
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppBaseShell />
    </MantineProvider>
  );
}

export default App;
