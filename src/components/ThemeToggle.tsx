"use client";

import { IconButton } from "@chakra-ui/react";
import { useTheme } from "@/lib/theme-context";

// Icônes SVG intégrées
const SunIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useTheme();
  const label =
    colorMode === "light" ? "Passer au mode sombre" : "Passer au mode clair";

  return (
    <IconButton
      aria-label={label}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      color="red.500"
      _hover={{
        bg: "red.100",
        color: "red.600",
      }}
      _active={{
        bg: "red.200",
        color: "red.700",
      }}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
