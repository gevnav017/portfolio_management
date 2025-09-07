"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/lib/theme";

import { createContext, useContext, useState } from "react";

const ThemeModeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
