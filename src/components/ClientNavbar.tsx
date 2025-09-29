"use client";

import { useUnifiedAuth } from "@/lib/hooks/useUnifiedAuth";
import { Box, Button, Flex, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ClientNavbar() {
  const { user, isAuthenticated, logout } = useUnifiedAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav>
      <Box
        bg="gray.50"
        px={4}
        py={4}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex justify="space-between" align="center">
          {/* Logo */}
          <Box>
            <Link
              as={NextLink}
              href="/"
              fontSize="xl"
              fontWeight="bold"
              color="blue.500"
            >
              Movies & Weather
            </Link>
          </Box>

          {/* Navigation Links */}
          <HStack gap={4} align="center">
            {isAuthenticated && (
              <>
                <Link as={NextLink} href="/dashboard" color="gray.600">
                  Dashboard
                </Link>
                <Link as={NextLink} href="/movies" color="gray.600">
                  Films
                </Link>
              </>
            )}
          </HStack>

          {/* Auth Section */}
          <Box>
            {isAuthenticated ? (
              <HStack gap={4} align="center">
                <Text fontSize="md" fontWeight="600" color="gray.700">
                  {user?.name}
                </Text>
                <Button
                  onClick={handleSignOut}
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  Se déconnecter
                </Button>
              </HStack>
            ) : (
              <HStack gap={2}>
                <Link as={NextLink} href="/login" color="gray.600">
                  Se connecter
                </Link>
                <Link as={NextLink} href="/signup">
                  <Button size="sm" colorScheme="blue" variant="solid">
                    S&apos;inscrire
                  </Button>
                </Link>
              </HStack>
            )}
          </Box>
        </Flex>
      </Box>
    </nav>
  );
}
