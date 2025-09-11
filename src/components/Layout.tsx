"use client";

import { useColorModeValue } from "@/lib/theme-context";
import { Box } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box minH="100vh" bg={bg} color={color}>
      <Box as="main" minH="calc(100vh - 64px)">
        {children}
      </Box>
    </Box>
  );
};
