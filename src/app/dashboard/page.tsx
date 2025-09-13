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
    city: string;
  } | null>(null);

  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useQuery(GET_WEATHER_QUERY, {
    variables: { city: user?.city },
    skip: !user?.city,
    errorPolicy: "all",
    onError: (error: any) => {
      console.error("Weather API Error:", error);
      console.error("GraphQL Errors:", error.graphQLErrors);
      console.error("Network Error:", error.networkError);
    },
  });
  const {
    data: favoritesData,
    loading: favoritesLoading,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useQuery(GET_FAVORITES_QUERY, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES_MUTATION, {
    onCompleted: () => {
      refetchFavorites();
    },
    onError: (error: any) => {
      console.error("Error removing from favorites:", error);
    },
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [getCurrentUser]);

  const handleRemoveFromFavorites = async (imdbId: string, title: string) => {
    if (!user?.id) {
      return;
    }

    if (
      window.confirm(
        `Êtes-vous sûr de vouloir retirer "${title}" de vos favoris ?`
      )
    ) {
      try {
        await removeFromFavorites({
          variables: { userId: user.id, imdbId },
        });
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Bonjour, {user?.name || "Utilisateur"} 👋
              </h1>
              <p style={{ color: "#718096", fontSize: "1.1rem", margin: "0" }}>
                Voici un aperçu de votre tableau de bord
              </p>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Weather Card */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
                borderRadius: "50%",
                opacity: "0.1",
              }}
            ></div>
            <div style={{ position: "relative", zIndex: "1" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🌤️</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    margin: "0",
                    color: "#2d3748",
                  }}
                >
                  Météo
                </h3>
              </div>

              {weatherLoading && (
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid #e2e8f0",
                      borderTop: "3px solid #667eea",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      margin: "0 auto 1rem",
                    }}
                  ></div>
                  <p style={{ color: "#718096", margin: "0" }}>Chargement...</p>
                </div>
              )}

              {weatherError && (
                <div
                  style={{
                    background: "#fed7d7",
                    color: "#c53030",
                    padding: "1rem",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    ⚠️
                  </div>
                  <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                    Service météo temporairement indisponible
                  </div>
                  <p
                    style={{ fontSize: "0.9rem", margin: "0", opacity: "0.8" }}
                  >
                    Le service météo est en cours de maintenance. Réessayez plus
                    tard.
                  </p>
                </div>
              )}

              {!user?.city && !weatherLoading && !weatherError && (
                <div
                  style={{
                    background: "#fef5e7",
                    color: "#744210",
                    padding: "1rem",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  📍 Aucune ville configurée
                  <p
                    style={{
                      fontSize: "0.9rem",
                      margin: "0.5rem 0 0 0",
                      opacity: "0.8",
                    }}
                  >
                    Configurez votre ville dans votre profil pour voir la météo
                  </p>
                </div>
              )}

              {(weatherData as any)?.weather && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <h4
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        margin: "0 0 0.5rem 0",
                        color: "#2d3748",
                      }}
                    >
                      {user?.city || (weatherData as any).weather.city},{" "}
                      {(weatherData as any).weather.country}
                    </h4>
                    <div
                      style={{
                        fontSize: "3rem",
                        fontWeight: "700",
                        color: "#667eea",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {(weatherData as any).weather.temperature}°
                    </div>
                    <p
                      style={{
                        color: "#718096",
                        margin: "0",
                        fontSize: "1rem",
                      }}
                    >
                      {(weatherData as any).weather.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#718096" }}>Ressenti:</span>
                      <span style={{ fontWeight: "600" }}>
                        {(weatherData as any).weather.feelsLike}°
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#718096" }}>Humidité:</span>
                      <span style={{ fontWeight: "600" }}>
                        {(weatherData as any).weather.humidity}%
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#718096" }}>Vent:</span>
                      <span style={{ fontWeight: "600" }}>
                        {(weatherData as any).weather.windSpeed} km/h
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#718096" }}>UV Index:</span>
                      <span style={{ fontWeight: "600" }}>
                        {(weatherData as any).weather.uvIndex}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Favorites Count Card */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
                borderRadius: "50%",
                opacity: "0.1",
              }}
            ></div>
            <div style={{ position: "relative", zIndex: "1" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🎬</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    margin: "0",
                    color: "#2d3748",
                  }}
                >
                  Favoris
                </h3>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "700",
                    color: "#e84393",
                    marginBottom: "0.5rem",
                  }}
                >
                  {(favoritesData as any)?.getFavoriteMovies?.length || 0}
                </div>
                <p style={{ color: "#718096", margin: "0", fontSize: "1rem" }}>
                  Films sauvegardés
                </p>
                <a
                  href="/movies"
                  style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    background:
                      "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "0.9rem",
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
                  Ajouter des films
                </a>
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
                borderRadius: "50%",
                opacity: "0.1",
              }}
            ></div>
            <div style={{ position: "relative", zIndex: "1" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>👤</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    margin: "0",
                    color: "#2d3748",
                  }}
                >
                  Profil
                </h3>
              </div>

              {user ? (
                <div>
                  <div style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        color: "#718096",
                        fontSize: "0.9rem",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      Nom
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        margin: "0",
                        color: "#2d3748",
                      }}
                    >
                      {user.name}
                    </p>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <p
                      style={{
                        color: "#718096",
                        fontSize: "0.9rem",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      Email
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        margin: "0",
                        color: "#2d3748",
                        fontSize: "0.9rem",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#718096",
                        fontSize: "0.9rem",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      ID
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        margin: "0",
                        color: "#2d3748",
                        fontSize: "0.8rem",
                        wordBreak: "break-all",
                      }}
                    >
                      {user.id}
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ color: "#718096", textAlign: "center" }}>
                  Chargement...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mes Films Favoris
            </h2>
            {(favoritesData as any)?.getFavoriteMovies?.length > 0 && (
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
                {(favoritesData as any).getFavoriteMovies.length} film
                {(favoritesData as any).getFavoriteMovies.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {favoritesLoading && (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "4px solid #e2e8f0",
                  borderTop: "4px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 1rem",
                }}
              ></div>
              <p style={{ color: "#718096", fontSize: "1.1rem" }}>
                Chargement de vos favoris...
              </p>
            </div>
          )}

          {favoritesError && (
            <div
              style={{
                background: "#fed7d7",
                color: "#c53030",
                padding: "1.5rem",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #feb2b2",
              }}
            >
              <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
                ⚠️
              </span>
              Erreur lors du chargement des favoris
            </div>
          )}

          {(favoritesData as any)?.getFavoriteMovies &&
          (favoritesData as any).getFavoriteMovies.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {(favoritesData as any).getFavoriteMovies.map((movie: Movie) => (
                <div
                  key={movie.imdbID}
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
                      <button
                        onClick={() =>
                          handleRemoveFromFavorites(movie.imdbID, movie.title)
                        }
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          background: "rgba(255,255,255,0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          fontSize: "1.2rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,1)";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.9)";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        title="Retirer des favoris"
                      >
                        🗑️
                      </button>
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

                    {movie.plot && (
                      <p
                        style={{
                          fontSize: "0.95rem",
                          marginBottom: "1rem",
                          lineHeight: "1.5",
                          color: "#4a5568",
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {movie.plot}
                      </p>
                    )}

                    {movie.genre && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {movie.genre
                          .split(", ")
                          .slice(0, 3)
                          .map((genre, index) => (
                            <span
                              key={index}
                              style={{
                                background:
                                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                padding: "0.4rem 0.8rem",
                                borderRadius: "20px",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              {genre}
                            </span>
                          ))}
                        {movie.genre.split(", ").length > 3 && (
                          <span
                            style={{
                              background: "#e2e8f0",
                              color: "#718096",
                              padding: "0.4rem 0.8rem",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            +{movie.genre.split(", ").length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {movie.imdbRating && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.75rem",
                          background:
                            "linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%)",
                          borderRadius: "12px",
                          border: "1px solid #f6ad55",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            color: "#744210",
                          }}
                        >
                          Note IMDb
                        </span>
                        <span
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "700",
                            color: "#744210",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          ⭐ {movie.imdbRating}/10
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !favoritesLoading &&
            !favoritesError && (
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
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎬</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "1rem",
                  }}
                >
                  Aucun film dans vos favoris
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
                  Commencez à explorer et ajoutez vos films préférés à votre
                  collection personnelle.
                </p>
                <a
                  href="/movies"
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    fontWeight: "600",
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
                  🔍 Découvrir des films
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
