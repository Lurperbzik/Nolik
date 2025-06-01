import { createContext, SetStateAction, Dispatch } from "react";
import { lightPalette, ColorPalette } from "./color.theme";
import { useContext } from "react";

type ColorContextType = {
  colors: ColorPalette;
  setColors: Dispatch<SetStateAction<ColorPalette>>;
};

export const ColorContext = createContext<ColorContextType>({
  colors: lightPalette,
  setColors: () => {},
});

export const useColors = () => useContext(ColorContext);
