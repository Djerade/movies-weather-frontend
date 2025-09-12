"use client";

import {
  GET_FAVORITES_QUERY,
  GET_WEATHER_QUERY,
  REMOVE_FROM_FAVORITES_MUTATION,
} from "@/lib/graphql/mutations";
import { useAuth } from "@/lib/hooks/useAuth";
import { Movie } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { getCurrentUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const { data: weatherData, loading: weatherLoading, error: weatherError } = useQuery(GET_WEATHER_QUERY);
  const { data: favoritesData, loading: favoritesLoading, error: favoritesError, refetch: refetchFavorites } = useQuery(GET_FAVORITES_QUERY, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES_MUTATION, {
    onCompleted: () => {
      alert("Film retiré des favoris");
      refetchFavorites();
    },
    onError: (error: any) => {
      alert(`Erreur: ${error.message}`);
    },
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [getCurrentUser]);

  const handleRemoveFromFavorites = async (imdbId: string) => {
    if (!user?.id) {
      alert("Erreur: Impossible de récupérer l'ID utilisateur");
      return;
    }

    try {
      await removeFromFavorites({
        variables: { userId: user.id, imdbId },
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Accès non autorisé</h1>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <a
          href="/login"
          style={{ color: "#3182ce", textDecoration: "underline" }}
        >
          Se connecter
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Weather Card */}
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Météo</h2>
          <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            {weatherLoading && <p>Chargement de la météo...</p>}
            {weatherError && (
              <div style={{ color: "red", padding: "0.5rem", backgroundColor: "#fee2e2", borderRadius: "4px" }}>
                Erreur lors du chargement de la météo
              </div>
            )}
            {(weatherData as any)?.weather && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {(weatherData as any).weather.city}, {(weatherData as any).weather.country}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
                    {(weatherData as any).weather.temperature}°C
                  </span>
                  <span style={{ fontSize: "1.2rem", color: "#666" }}>
                    {(weatherData as any).weather.description}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                  <span>Ressenti: {(weatherData as any).weather.feelsLike}°C</span>
                  <span>Humidité: {(weatherData as any).weather.humidity}%</span>
                  <span>Pression: {(weatherData as any).weather.pressure} hPa</span>
                  <span>Vent: {(weatherData as any).weather.windSpeed} km/h</span>
                  <span>Direction: {(weatherData as any).weather.windDirection}°</span>
                  <span>Visibilité: {(weatherData as any).weather.visibility} km</span>
                  <span>UV Index: {(weatherData as any).weather.uvIndex}</span>
                  <span>Lever: {(weatherData as any).weather.sunrise}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#999" }}>
                  Coucher: {(weatherData as any).weather.sunset}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Informations utilisateur</h2>
          <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            {user ? (
              <div>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Nom:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            ) : (
              <p>Aucune information utilisateur trouvée</p>
            )}
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Mes Favoris</h2>
        {favoritesLoading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Chargement des favoris...</p>
          </div>
        )}
        {favoritesError && (
          <div style={{ color: "red", padding: "0.5rem", backgroundColor: "#fee2e2", borderRadius: "4px", marginBottom: "1rem" }}>
            Erreur lors du chargement des favoris
          </div>
        )}
        {(favoritesData as any)?.getFavoriteMovies && (favoritesData as any).getFavoriteMovies.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {(favoritesData as any).getFavoriteMovies.map((movie: Movie) => (
              <div key={movie.imdbID} style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                {movie.poster && movie.poster !== "N/A" && (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
                <div style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                    <div style={{ flex: "1" }}>
                      <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.25rem 0" }}>{movie.title}</h3>
                      <p style={{ color: "#666", fontSize: "0.9rem", margin: "0" }}>
                        {movie.year}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromFavorites(movie.imdbID)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        padding: "0.25rem"
                      }}
                      title="Retirer des favoris"
                    >
                      🗑️
                    </button>
                  </div>
                  {movie.plot && (
                    <p style={{ fontSize: "0.9rem", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                      {movie.plot}
                    </p>
                  )}
                  {movie.genre && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      {movie.genre.split(", ").map((genre, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: "#e3f2fd",
                            color: "#1976d2",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                            fontSize: "0.8rem"
                          }}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                  {movie.imdbRating && (
                    <p style={{ fontSize: "0.9rem", fontWeight: "bold", margin: "0" }}>
                      ⭐ {movie.imdbRating}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: "#666", padding: "1rem", backgroundColor: "#f0f8ff", borderRadius: "4px", textAlign: "center" }}>
            Aucun film dans vos favoris.{" "}
            <a
              href="/movies"
              style={{ color: "#3182ce", textDecoration: "underline" }}
            >
              Rechercher des films
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
