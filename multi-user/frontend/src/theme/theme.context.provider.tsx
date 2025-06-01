import { useState, ReactNode } from "react";
import { ColorContext } from "./theme.context";
import { ColorPalette, lightPalette } from "./color.theme";

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<ColorPalette>(lightPalette);

  return (
    <ColorContext.Provider value={{ colors, setColors }}>
      {children}
    </ColorContext.Provider>
  );
};
