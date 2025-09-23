"use client";

import { useAuth0 } from '@/lib/hooks/useAuth0';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function CallbackPage() {
  const { handleAuthCallback, isLoading, error } = useAuth0();

  useEffect(() => {
    handleAuthCallback();
  }, [handleAuthCallback]);

  if (error) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack gap={4}>
          <Text color="red.500" fontSize="lg">
            Erreur d'authentification: {error}
          </Text>
          <Text>
            <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
              Retour à la page de connexion
            </a>
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg">Authentification en cours...</Text>
      </VStack>
    </Box>
  );
}
