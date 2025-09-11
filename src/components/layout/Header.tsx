"use client";

// import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/lib/theme-context";
import { Box, Flex, Heading } from "@chakra-ui/react";

export const Header = () => {
  const { colorMode } = useTheme();

  const bg = colorMode === "light" ? "white" : "gray.800";
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700";
  const textColor = colorMode === "light" ? "gray.800" : "white";

  return (
    <Box
      as="header"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        <Heading size="lg" color={textColor}>
          Movies & Weather App
        </Heading>
        {/* <ThemeToggle /> */}
      </Flex>
    </Box>
  );
};
