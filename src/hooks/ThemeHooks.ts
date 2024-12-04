import { useContext } from "react"
import { ThemeChangeContext, ThemeModeContext } from "../contexts/ThemeContext";

export const useThemeMode = () => {
    const context = useContext(ThemeModeContext);
    if (context === null) {
        throw new Error("useThemeMode: ThemeProvider not found!");
    }
    return context;
}

export const useThemeChange = () => {
    const context = useContext(ThemeChangeContext);
    if (context === null) {
        throw new Error("useThemeChange: ThemeProvider not found!");
    }
    return context;
}