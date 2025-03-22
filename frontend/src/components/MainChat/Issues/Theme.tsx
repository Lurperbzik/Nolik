import { createTheme, MantineProvider, rem } from '@mantine/core';

const theme = createTheme({
  headings: {
    fontWeight: '400',
    sizes: {
      h1: { fontSize: rem(20), lineHeight: '1.4', fontWeight: '700' },
      h2: { fontSize: rem(14), lineHeight: '1.4' },
      h3: { fontSize: rem(12), lineHeight: '1.4' },
      h4: { fontSize: rem(10), lineHeight: '1.4' },
      h5: { fontSize: rem(8), lineHeight: '1.4' },
      h6: { fontSize: rem(6), lineHeight: '1.4' },
    },
  },
});

type ThemeProps = {
  children: React.ReactNode;
};

export function Theme({ children }: ThemeProps) {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
