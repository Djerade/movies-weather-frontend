"use client";

import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import MovieCard from "./MovieCard";

interface Movie {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
  plot?: string;
  imdbRating?: string;
  genre?: string;
  director?: string;
  actors?: string;
}

interface FavoritesListProps {
  favorites: Movie[];
  loading?: boolean;
  error?: string;
  onRemoveFavorite?: (imdbID: string) => void;
}

export default function FavoritesList({
  favorites,
  loading,
  error,
  onRemoveFavorite,
}: FavoritesListProps) {
  if (loading) {
    return (
      <Box
        bg="white"
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        _dark={{ bg: "gray.800", borderColor: "gray.600" }}
      >
        <HStack justify="center" gap={4}>
          <Spinner size="lg" color="blue.500" />
          <Text>Chargement de vos favoris...</Text>
        </HStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        bg="red.50"
        borderColor="red.200"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        _dark={{ bg: "red.900", borderColor: "red.700" }}
      >
        <Text color="red.500">
          Erreur lors du chargement des favoris: {error}
        </Text>
      </Box>
    );
  }

  if (favorites.length === 0) {
    return (
      <Box
        bg="white"
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="lg"
        p={8}
        textAlign="center"
        _dark={{ bg: "gray.800", borderColor: "gray.600" }}
      >
        <VStack gap={4}>
          <StarIcon boxSize={12} color="gray.400" />
          <Text fontSize="lg" color="gray.600">
            Aucun film favori pour le moment
          </Text>
          <Text fontSize="sm" color="gray.500">
            Explorez les films et ajoutez vos préférés à votre liste !
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Mes Films Favoris
        </Text>
        <Text
          bg="blue.100"
          color="blue.800"
          px={3}
          py={1}
          borderRadius="md"
          fontSize="md"
          _dark={{ bg: "blue.900", color: "blue.200" }}
        >
          {favorites.length} film{favorites.length > 1 ? "s" : ""}
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6} w="full">
        {favorites.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            showDetails={true}
            onToggleFavorite={onRemoveFavorite}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
