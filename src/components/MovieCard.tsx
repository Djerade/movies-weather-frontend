"use client";

import { StarIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";

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

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (imdbID: string) => void;
  showDetails?: boolean;
}

export default function MovieCard({
  movie,
  isFavorite = false,
  onToggleFavorite,
  showDetails = false,
}: MovieCardProps) {
  return (
    <Box
      bg="white"
      borderColor="gray.200"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "lg",
      }}
      maxW="sm"
    >
      <Box position="relative">
        <Image
          src={movie.poster !== "N/A" ? movie.poster : "/placeholder-movie.jpg"}
          alt={movie.title}
          objectFit="cover"
          height="300px"
          width="100%"
        />
        {onToggleFavorite && (
          <Button
            position="absolute"
            top="2"
            right="2"
            size="sm"
            colorScheme={isFavorite ? "yellow" : "gray"}
            variant="solid"
            onClick={() => onToggleFavorite(movie.imdbID)}
            bg={isFavorite ? "yellow.400" : "whiteAlpha.800"}
            _hover={{
              bg: isFavorite ? "yellow.500" : "whiteAlpha.900",
            }}
          >
            <StarIcon mr={1} />
            {isFavorite ? "Favori" : "Ajouter"}
          </Button>
        )}
      </Box>

      <Box p={4}>
        <VStack align="start" gap={2}>
          <Text fontSize="lg" fontWeight="bold">
            {movie.title}
          </Text>

          <HStack gap={2}>
            <Badge colorScheme="blue" variant="subtle">
              {movie.year}
            </Badge>
            {movie.imdbRating && (
              <Badge colorScheme="green" variant="subtle">
                ⭐ {movie.imdbRating}
              </Badge>
            )}
          </HStack>

          {showDetails && (
            <VStack align="start" gap={1} w="full">
              {movie.genre && (
                <Text fontSize="sm" color="gray.600">
                  <strong>Genre:</strong> {movie.genre}
                </Text>
              )}
              {movie.director && (
                <Text fontSize="sm" color="gray.600">
                  <strong>Réalisateur:</strong> {movie.director}
                </Text>
              )}
              {movie.actors && (
                <Text fontSize="sm" color="gray.600">
                  <strong>Acteurs:</strong> {movie.actors}
                </Text>
              )}
              {movie.plot && (
                <Text fontSize="sm" color="gray.600">
                  {movie.plot}
                </Text>
              )}
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
