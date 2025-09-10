'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Movies & Weather App
          </Heading>
          <Text fontSize="lg" color="gray.600">
            A modern application for discovering movies and checking weather
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
