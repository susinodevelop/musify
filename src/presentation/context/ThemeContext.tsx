import { darkTheme, lightTheme, ThemeColors } from "@/theme/ThemeColors";
import React, { createContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";

export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  themeColors: ThemeColors;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() === "dark" ? "dark" : "light";

  const [currentTheme, setCurrentTheme] = useState<Theme>(systemTheme);
  const [currentThemeColors, setCurrentThemeColors] =
    useState<ThemeColors>(lightTheme);

  const setTheme = (theme: Theme) => {
    switch (theme) {
      case "light":
        setCurrentTheme("light");
        setCurrentThemeColors(lightTheme);
        break;
      case "dark":
        setCurrentTheme("dark");
        setCurrentThemeColors(darkTheme);
        break;
      default:
        setCurrentTheme("light");
        setCurrentThemeColors(lightTheme);
        break;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeColors: currentThemeColors,
        setTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
