"use client";

import { useUnifiedAuth } from "@/lib/hooks/useUnifiedAuth";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignupPage() {
  const { signup, isLoading, error } = useUnifiedAuth();

  // États du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleAuth0Signup = () => {
    // Auth0 gère l'inscription via le même flux de connexion
    // avec le paramètre signup pour forcer l'affichage du formulaire d'inscription
    signup();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "L'email n'est pas valide";
    }

    if (!formData.city.trim()) {
      errors.city = "La ville est requise";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Pour l'inscription, nous utilisons Auth0 directement
    // Les informations du formulaire seront utilisées après l'authentification Auth0
    handleAuth0Signup();
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
              <Text color="gray.400" fontSize="sm" mt={2}>
                L&apos;inscription se fait via Auth0 pour une sécurité optimale
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
                ❌ {error}
              </Box>
            )}

            {/* Formulaire d'inscription */}
            <form onSubmit={handleFormSubmit}>
              <VStack gap={4}>
                {/* Nom */}
                <Box w="full">
                  <Text fontWeight="medium" mb={2}>
                    Nom complet *
                  </Text>
                  <Input
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                    borderColor={formErrors.name ? "red.500" : "gray.300"}
                  />
                  {formErrors.name && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {formErrors.name}
                    </Text>
                  )}
                </Box>

                {/* Email */}
                <Box w="full">
                  <Text fontWeight="medium" mb={2}>
                    Adresse email *
                  </Text>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={e => handleInputChange("email", e.target.value)}
                    borderColor={formErrors.email ? "red.500" : "gray.300"}
                  />
                  {formErrors.email && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {formErrors.email}
                    </Text>
                  )}
                </Box>

                {/* Ville */}
                <Box w="full">
                  <Text fontWeight="medium" mb={2}>
                    Ville *
                  </Text>
                  <Input
                    type="text"
                    placeholder="Votre ville"
                    value={formData.city}
                    onChange={e => handleInputChange("city", e.target.value)}
                    borderColor={formErrors.city ? "red.500" : "gray.300"}
                  />
                  {formErrors.city && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {formErrors.city}
                    </Text>
                  )}
                </Box>

                {/* Bouton de soumission */}
                <Button
                  type="submit"
                  size="lg"
                  w="full"
                  colorScheme="blue"
                  variant="solid"
                  loading={isLoading}
                  loadingText="Redirection vers Auth0..."
                >
                  Créer mon compte
                </Button>
              </VStack>
            </form>

            {/* Séparateur */}
            <Box textAlign="center" my={6}>
              <Text color="gray.500" fontSize="sm">
                ou
              </Text>
            </Box>

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
              <FaGoogle style={{ marginRight: "8px" }} />
              S&apos;inscrire avec Auth0
            </Button>

            {/* Login Link */}
            <Box
              textAlign="center"
              mt={6}
              pt={4}
              borderTop="1px"
              borderColor="gray.200"
            >
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
