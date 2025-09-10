'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import { useColorModeValue } from '@/lib/theme-context';
import { ThemeTest } from '@/components/ThemeTest';

export default function HomePage() {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8}>
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Movies & Weather App
            </Heading>
            <Text fontSize="lg" color={textColor}>
              A modern application for discovering movies and checking weather
            </Text>
          </Box>
          <ThemeTest />
        </VStack>
      </Container>
    </Layout>
  );
}
