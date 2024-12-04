import { createContext } from "react";
import { TChangeTheme, ThemeModeType } from "../providers/ThemeProvider";

export const ThemeModeContext = createContext<ThemeModeType | null>(null);
export const ThemeChangeContext = createContext<TChangeTheme | null>(null);