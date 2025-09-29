"use client";

import { useAuth0 } from "@/lib/hooks/useAuth0";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const { handleAuthCallback, error } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    // Vérifier s'il y a un hash dans l'URL
    if (typeof window !== "undefined" && !window.location.hash) {
      // Rediriger vers la page de connexion si pas de hash
      router.push("/login");
      return;
    }

    handleAuthCallback();
  }, [handleAuthCallback, router]);

  if (error) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <Text color="red.500" fontSize="lg">
            Erreur d&apos;authentification: {error}
          </Text>
          <Text>
            <a
              href="/login"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Retour à la page de connexion
            </a>
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg">Authentification en cours...</Text>
      </VStack>
    </Box>
  );
}
