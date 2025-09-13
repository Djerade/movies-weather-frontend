"use client";

import {
  ADD_TO_FAVORITES_MUTATION,
  SEARCH_MOVIES_QUERY,
} from "@/lib/graphql/mutations";
import { useAuth } from "@/lib/hooks/useAuth";
import { MovieSearchResult } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, getCurrentUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, loading, error } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { query: searchTerm },
    skip: !searchTerm,
    errorPolicy: "all",
  });

  useEffect(() => {
    if (error) {
      console.error("GraphQL Error in MoviesPage:", error);
    }
  }, [error]);

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES_MUTATION, {
    onCompleted: () => {
      // Film ajouté avec succès
    },
    onError: (error: any) => {
      console.error("Error adding to favorites:", error);
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

  // Éviter l'erreur d'hydratation en ne rendant rien jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid #e2e8f0",
              borderTop: "4px solid #667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1.5rem",
            }}
          ></div>
          <p style={{ color: "#718096", fontSize: "1.1rem" }}>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              marginBottom: "1rem",
              color: "#2d3748",
            }}
          >
            Accès non autorisé
          </h1>
          <p style={{ color: "#718096", marginBottom: "2rem" }}>
            Vous devez être connecté pour accéder à cette page.
          </p>
          <a
            href="/login"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "transform 0.2s",
            }}
            onMouseOver={e =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={e =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
              }}
            >
              <span style={{ fontSize: "2rem" }}>🎬</span>
            </div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Découvrez des Films
            </h1>
            <p style={{ color: "#718096", fontSize: "1.1rem" }}>
              Recherchez et ajoutez vos films préférés à votre collection
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: "1",
                padding: "1rem 1.5rem",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "1rem",
                color: "#2d3748",
                backgroundColor: "#ffffff",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                outline: "none",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "1rem 2rem",
                background: loading
                  ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: loading
                  ? "none"
                  : "0 5px 15px rgba(102, 126, 234, 0.4)",
              }}
              onMouseOver={e => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(102, 126, 234, 0.5)";
                }
              }}
              onMouseOut={e => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(102, 126, 234, 0.4)";
                }
              }}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Recherche...
                </div>
              ) : (
                "Rechercher"
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {error && (
            <div
              style={{
                background: "#fed7d7",
                color: "#c53030",
                padding: "1.5rem",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #feb2b2",
                marginBottom: "2rem",
              }}
            >
              <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
                ⚠️
              </span>
              <div>
                <strong>Erreur lors de la recherche:</strong>
                <br />
                {error.message}
                {(error as any).graphQLErrors &&
                  (error as any).graphQLErrors.length > 0 && (
                    <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                      Détails:{" "}
                      {(error as any).graphQLErrors
                        .map((err: any) => err.message)
                        .join(", ")}
                    </div>
                  )}
                {(error as any).networkError && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                    Erreur réseau: {(error as any).networkError.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: "4rem" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "4px solid #e2e8f0",
                  borderTop: "4px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 1.5rem",
                }}
              ></div>
              <p style={{ color: "#718096", fontSize: "1.2rem" }}>
                Recherche en cours...
              </p>
            </div>
          )}

          {(data as any)?.searchMovies && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    margin: "0",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Résultats pour &quot;{searchTerm}&quot;
                </h2>
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  {(data as any).searchMovies.totalResults} résultat
                  {(data as any).searchMovies.totalResults !== "1" ? "s" : ""}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {(data as any).searchMovies.search.map(
                  (movie: MovieSearchResult, index: number) => (
                    <div
                      key={`${movie.imdbID}-${index}`}
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 15px 35px rgba(0,0,0,0.15)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0,0,0,0.08)";
                      }}
                    >
                      {movie.poster && movie.poster !== "N/A" && (
                        <div
                          style={{
                            position: "relative",
                            height: "250px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                            }}
                            onMouseOver={e =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={e =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "1rem",
                              right: "1rem",
                              background: "rgba(0,0,0,0.7)",
                              color: "white",
                              padding: "0.5rem 0.75rem",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            {movie.type}
                          </div>
                        </div>
                      )}
                      <div style={{ padding: "1.5rem" }}>
                        <div style={{ marginBottom: "1rem" }}>
                          <h3
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: "700",
                              margin: "0 0 0.5rem 0",
                              color: "#2d3748",
                              lineHeight: "1.3",
                            }}
                          >
                            {movie.title}
                          </h3>
                          <p
                            style={{
                              color: "#718096",
                              fontSize: "1rem",
                              margin: "0 0 1rem 0",
                              fontWeight: "500",
                            }}
                          >
                            {movie.year}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.75rem",
                            background:
                              "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                            borderRadius: "12px",
                            border: "1px solid #90caf9",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              color: "#1565c0",
                            }}
                          >
                            ID: {movie.imdbID}
                          </span>
                          <button
                            onClick={() => handleAddToFavorites(movie)}
                            style={{
                              background:
                                "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              padding: "0.5rem 1rem",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition:
                                "transform 0.2s ease, box-shadow 0.2s ease",
                              boxShadow: "0 3px 10px rgba(253, 121, 168, 0.3)",
                            }}
                            onMouseOver={e => {
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                              e.currentTarget.style.boxShadow =
                                "0 5px 15px rgba(253, 121, 168, 0.4)";
                            }}
                            onMouseOut={e => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow =
                                "0 3px 10px rgba(253, 121, 168, 0.3)";
                            }}
                          >
                            ❤️ Ajouter aux favoris
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {searchTerm &&
            (data as any)?.searchMovies?.search?.length === 0 &&
            !loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background:
                    "linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)",
                  borderRadius: "16px",
                  border: "2px dashed #cbd5e0",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "1rem",
                  }}
                >
                  Aucun film trouvé
                </h3>
                <p
                  style={{
                    color: "#718096",
                    fontSize: "1.1rem",
                    marginBottom: "2rem",
                    maxWidth: "400px",
                    margin: "0 auto 2rem",
                  }}
                >
                  Aucun résultat pour &quot;{searchTerm}&quot;. Essayez avec
                  d&apos;autres mots-clés.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchTerm("");
                  }}
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    boxShadow: "0 5px 15px rgba(102, 126, 234, 0.4)",
                  }}
                  onMouseOver={e =>
                    (e.currentTarget.style.transform = "translateY(-3px)")
                  }
                  onMouseOut={e =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  🔄 Nouvelle recherche
                </button>
              </div>
            )}

          {!searchTerm && !loading && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                background: "linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)",
                borderRadius: "16px",
                border: "2px dashed #cbd5e0",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎬</div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#2d3748",
                  marginBottom: "1rem",
                }}
              >
                Commencez votre recherche
              </h3>
              <p
                style={{
                  color: "#718096",
                  fontSize: "1.1rem",
                  marginBottom: "2rem",
                  maxWidth: "400px",
                  margin: "0 auto 2rem",
                }}
              >
                Utilisez la barre de recherche ci-dessus pour découvrir des
                milliers de films et ajoutez vos favoris à votre collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
