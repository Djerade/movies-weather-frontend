'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { ThemeToggle } from './ThemeToggle';
import { useColorModeValue } from '@/lib/theme-context';

export const Header = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

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
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        <Heading size="lg" color={textColor}>
          Movies & Weather App
        </Heading>
        <ThemeToggle />
      </Flex>
    </Box>
  );
};
