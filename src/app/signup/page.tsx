"use client";

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { SignupForm } from "@/components/forms/SignupForm";
import { useColorModeValue } from "@/lib/theme-context";

export default function SignupPage() {
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Layout>
      <Container maxW="container.sm" py={8}>
        <VStack gap={6}>
          <Box textAlign="center">
            <Heading size="lg" mb={2}>
              Create Your Account
            </Heading>
            <Text fontSize="md" color={textColor}>
              Join us to discover movies and check weather information
            </Text>
          </Box>
          <SignupForm />
        </VStack>
      </Container>
    </Layout>
  );
}
