"use client";

import { useTheme } from "@/lib/theme-context";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useTheme();

  const icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;
  const label =
    colorMode === "light" ? "Passer au mode sombre" : "Passer au mode clair";

  return (
    <IconButton
      aria-label={label}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      _hover={{
        bg: colorMode === "light" ? "gray.100" : "gray.700",
      }}
    >
      {icon}
    </IconButton>
  );
};
