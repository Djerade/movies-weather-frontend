"use client";

import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
  loading?: boolean;
  error?: string;
}

const getUVIndexColor = (uvIndex: number) => {
  if (uvIndex <= 2) return "green";
  if (uvIndex <= 5) return "yellow";
  if (uvIndex <= 7) return "orange";
  if (uvIndex <= 10) return "red";
  return "purple";
};

export default function WeatherCard({
  weather,
  loading,
  error,
}: WeatherCardProps) {
  if (loading) {
    return (
      <Box
        bg="white"
        borderColor="gray.200"
        borderWidth="1px"
        p={4}
        borderRadius="lg"
        _dark={{ bg: "gray.800", borderColor: "gray.600" }}
      >
        <Text>Chargement de la météo...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        bg="white"
        borderColor="gray.200"
        borderWidth="1px"
        p={4}
        borderRadius="lg"
        _dark={{ bg: "gray.800", borderColor: "gray.600" }}
      >
        <Text color="red.500">Erreur: {error}</Text>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      borderColor="gray.200"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      _dark={{
        bg: "gray.800",
        borderColor: "gray.600",
      }}
    >
      <VStack gap={4} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" gap={0}>
            <Text fontSize="xl" fontWeight="bold">
              {weather.city}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {weather.country}
            </Text>
          </VStack>
          <Text fontSize="4xl">🌤️</Text>
        </HStack>

        {/* Main temperature */}
        <VStack gap={1}>
          <Text fontSize="4xl" fontWeight="bold" color="blue.500">
            {Math.round(weather.temperature)}°C
          </Text>
          <Text fontSize="sm" color="gray.600">
            Ressenti: {Math.round(weather.feelsLike)}°C
          </Text>
          <Badge colorScheme="blue" variant="subtle" textTransform="capitalize">
            {weather.description}
          </Badge>
        </VStack>

        {/* Weather details */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Détails
          </Text>
          <VStack gap={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm">Humidité:</Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.humidity}%
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm">Pression:</Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.pressure} hPa
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm">Vent:</Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.windSpeed} km/h {weather.windDirection}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm">Visibilité:</Text>
              <Text fontSize="sm" fontWeight="medium">
                {weather.visibility} km
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm">Index UV:</Text>
              <Badge
                colorScheme={getUVIndexColor(weather.uvIndex)}
                variant="subtle"
              >
                {weather.uvIndex}
              </Badge>
            </HStack>
          </VStack>
        </Box>

        {/* Sunrise/Sunset */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Soleil
          </Text>
          <HStack justify="space-between">
            <VStack gap={0}>
              <Text fontSize="sm" color="orange.500">
                Lever
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {new Date(weather.sunrise).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </VStack>
            <VStack gap={0}>
              <Text fontSize="sm" color="purple.500">
                Coucher
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {new Date(weather.sunset).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
