"use client";

import { Box, Text, Button } from "@chakra-ui/react";
import { useTheme, useColorModeValue } from "@/lib/theme-context";

export const ThemeTest = () => {
  const { colorMode, toggleColorMode } = useTheme();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      p={4}
      bg={bgColor}
      color={textColor}
      border="1px"
      borderColor="gray.300"
    >
      <Text mb={2}>Mode actuel: {colorMode}</Text>
      <Button onClick={toggleColorMode} colorScheme="red">
        Changer le thème
      </Button>
    </Box>
  );
};
