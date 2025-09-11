"use client";

import { Layout } from "@/components/Layout";
import { ThemeTest } from "@/components/ThemeTest";
import { useColorModeValue } from "@/lib/theme-context";
import { Box, Container, Text, VStack } from "@chakra-ui/react";

export default function HomePage() {
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8}>
          <Box textAlign="center">
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
