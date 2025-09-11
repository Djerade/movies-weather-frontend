"use client";

import { useTheme } from "@/lib/theme-context";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { colorMode } = useTheme();

  const bg = colorMode === "light" ? "gray.50" : "gray.900";
  const color = colorMode === "light" ? "gray.800" : "white";

  return (
    <Box minH="100vh" bg={bg} color={color}>
      <Header />
      <Box as="main" minH="calc(100vh - 64px)">
        {children}
      </Box>
    </Box>
  );
};
