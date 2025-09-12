"use client";

import {
    ADD_TO_FAVORITES_MUTATION,
    SEARCH_MOVIES_QUERY,
} from "@/lib/graphql/mutations";
import { useAuth } from "@/lib/hooks/useAuth";
import { MovieSearchResult } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, getCurrentUser } = useAuth();

  const { data, loading, error } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { query: searchTerm },
    skip: !searchTerm,
  });

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES_MUTATION, {
    onCompleted: () => {
      alert("Film ajouté aux favoris");
    },
    onError: (error: any) => {
      alert(`Erreur: ${error.message}`);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery.trim());
    }
  };

  const handleAddToFavorites = async (movie: MovieSearchResult) => {
    if (!isAuthenticated()) {
      alert("Vous devez être connecté pour ajouter des favoris");
      return;
    }

    const user = getCurrentUser();
    if (!user?.id) {
      alert("Erreur: Impossible de récupérer l'ID utilisateur");
      return;
    }

    try {
      await addToFavorites({
        variables: { userId: user.id, imdbId: movie.imdbID },
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
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
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Recherche de Films</h1>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: "1",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem"
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: loading ? "#9ca3af" : "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </form>
      </div>

      {error && (
        <div style={{ color: "red", padding: "0.5rem", backgroundColor: "#fee2e2", borderRadius: "4px", marginBottom: "1rem" }}>
          Erreur lors de la recherche: {error.message}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Recherche en cours...</p>
        </div>
      )}

      {(data as any)?.searchMovies && (
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Résultats de recherche pour "{searchTerm}" ({(data as any).searchMovies.totalResults} résultats)
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {(data as any).searchMovies.search.map((movie: MovieSearchResult) => (
              <div key={movie.imdbID} style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                {movie.poster && movie.poster !== "N/A" && (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.25rem 0" }}>{movie.title}</h3>
                  <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 0.75rem 0" }}>
                    {movie.year} • {movie.type}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                      ID: {movie.imdbID}
                    </span>
                    <button
                      onClick={() => handleAddToFavorites(movie)}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "0.9rem",
                        cursor: "pointer"
                      }}
                    >
                      ❤️ Ajouter aux favoris
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && (data as any)?.searchMovies?.search?.length === 0 && !loading && (
        <div style={{ color: "#666", padding: "1rem", backgroundColor: "#f0f8ff", borderRadius: "4px", textAlign: "center" }}>
          Aucun film trouvé pour "{searchTerm}"
        </div>
      )}
    </div>
  );
}
