"use client";

import { useUnifiedAuth } from "@/lib/hooks/useUnifiedAuth";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function SignupPage() {
  const { signup, isLoading, error } = useUnifiedAuth();

  const handleAuth0Signup = () => {
    // Auth0 gère l'inscription via le même flux de connexion
    // avec le paramètre signup pour forcer l'affichage du formulaire d'inscription
    signup();
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <Box
          bg="white"
          borderRadius="20px"
          p={8}
          boxShadow="0 20px 40px rgba(0,0,0,0.1)"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative elements */}
          <Box
            position="absolute"
            top="-50px"
            right="-50px"
            w="150px"
            h="150px"
            bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
            borderRadius="50%"
            opacity="0.1"
          />
          <Box
            position="absolute"
            bottom="-30px"
            left="-30px"
            w="100px"
            h="100px"
            bgGradient="linear(135deg, #fd79a8 0%, #e84393 100%)"
            borderRadius="50%"
            opacity="0.1"
          />

          <Box position="relative" zIndex={1}>
            {/* Header */}
            <Box textAlign="center" mb={8}>
              <Box
                w="80px"
                h="80px"
                bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
                borderRadius="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                margin="0 auto 1.5rem"
                boxShadow="0 10px 25px rgba(102, 126, 234, 0.3)"
              >
                <Text fontSize="2rem">🎬</Text>
              </Box>
              <Heading
                size="lg"
                bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
                bgClip="text"
                mb={2}
              >
                Rejoignez-nous !
              </Heading>
              <Text color="gray.500" fontSize="lg">
                Créez votre compte pour accéder à votre tableau de bord
              </Text>
            </Box>

            {/* Error Alert */}
            {error && (
              <Box
                p={4}
                bg="red.50"
                border="1px solid"
                borderColor="red.200"
                borderRadius="md"
                color="red.600"
                mb={6}
              >
                {error}
              </Box>
            )}

            {/* Auth0 Signup Button */}
            <Button
              onClick={handleAuth0Signup}
              size="lg"
              w="full"
              colorScheme="blue"
              variant="outline"
              loading={isLoading}
              loadingText="Inscription..."
            >
              <FaGoogle style={{ marginRight: '8px' }} />
              S'inscrire avec Auth0
            </Button>

            {/* Login Link */}
            <Box textAlign="center" mt={6} pt={4} borderTop="1px" borderColor="gray.200">
              <Text color="gray.500" fontSize="sm" mb={3}>
                Déjà un compte ?
              </Text>
              <Link href="/login">
                <Button
                  size="md"
                  variant="ghost"
                  colorScheme="blue"
                  _hover={{
                    transform: "translateY(-2px)",
                  }}
                >
                  Se connecter
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
