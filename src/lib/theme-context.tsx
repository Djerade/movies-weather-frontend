"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Récupérer le thème depuis localStorage
    const savedTheme = localStorage.getItem("chakra-ui-color-mode") as
      | "light"
      | "dark"
      | null;
    if (savedTheme) {
      setColorMode(savedTheme);
    }
  }, []);

  const toggleColorMode = () => {
    const newColorMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newColorMode);
    localStorage.setItem("chakra-ui-color-mode", newColorMode);

    // Mettre à jour l'attribut data-theme sur le document
    document.documentElement.setAttribute("data-theme", newColorMode);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useColorModeValue = (lightValue: string, darkValue: string) => {
  const { colorMode } = useTheme();
  return colorMode === "light" ? lightValue : darkValue;
};
