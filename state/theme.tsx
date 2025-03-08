"use client";
import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";

const ThemeContext = createContext({
    theme: "light",
    setTheme: (theme: string) => {},
});

export function Provider({ children, defaultTheme = "dark" }: PropsWithChildren<{ defaultTheme?: string }>) {
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark" ||
              (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
          );

          // Whenever the user explicitly chooses light mode\
          if (theme === "light") {
            localStorage.theme = "light";
          } else {
            localStorage.theme = "dark";
          }

    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
