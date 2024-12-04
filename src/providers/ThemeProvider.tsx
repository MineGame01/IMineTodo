import { useEffect, useState } from "react";
import { ThemeChangeContext, ThemeModeContext } from "../contexts/ThemeContext";

export type ThemeModeType = "auto" | "light" | "dark";
export type TChangeTheme = (theme: ThemeModeType) => void;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const getTheme = localStorage.getItem("theme") ?? "auto";

    const [theme, setTheme] = useState<ThemeModeType>(getTheme as ThemeModeType)

    const changeTheme = (newTheme: ThemeModeType) => {
        const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const changeTheme = (theme: ThemeModeType) => { document.documentElement.setAttribute("data-bs-theme", theme); };
        if (newTheme === "auto") changeTheme(isDarkTheme ? "dark" : "light"); 
        else changeTheme(newTheme);
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        changeTheme(theme);
    }, [theme])

    return <>
        <ThemeModeContext.Provider value={theme}>
            <ThemeChangeContext.Provider value={setTheme}>
                { children }
            </ThemeChangeContext.Provider>
        </ThemeModeContext.Provider>
    </>
}