"use client";

import { Auth0User } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth0Client } from "../auth0-config";
import { CREATE_AUTH0_USER_MUTATION } from "../graphql";

export function useAuth0() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Auth0User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [createAuth0User] = useMutation(CREATE_AUTH0_USER_MUTATION);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("auth0_access_token");
    const userStr = localStorage.getItem("auth0_user");

    if (token && userStr) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userStr));
    }
  };

  const login = (mode: "login" | "signup" = "login") => {
    setIsLoading(true);
    setError(null);

    try {
      // Auth0 gère l'inscription via le même flux
      // On peut ajouter des paramètres pour personnaliser l'expérience
      const options: any = {};

      if (mode === "signup") {
        // Forcer l'affichage du formulaire d'inscription
        options.screen_hint = "signup";
      }

      auth0Client.authorize(options);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur de connexion Auth0";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleAuthCallback = () => {
    setIsLoading(true);
    setError(null);

    // Vérifier s'il y a un hash dans l'URL
    if (typeof window !== "undefined" && !window.location.hash) {
      setError("Aucun token d'authentification trouvé dans l'URL");
      setIsLoading(false);
      return;
    }

    // Nettoyer les anciens tokens pour éviter les conflits de state
    clearAuth0Data();

    auth0Client.parseHash((err: any, result: any) => {
      if (err) {
        console.error("Auth0 callback error:", err);

        // Gérer différents types d'erreurs
        let errorMessage = "Erreur de callback Auth0";
        if (err.error) {
          if (err.error === "invalid_token" && err.errorDescription?.includes("state")) {
            errorMessage = "Session expirée. Veuillez vous reconnecter.";
            // Rediriger vers la page de connexion après 2 secondes
            setTimeout(() => {
              if (typeof window !== "undefined") {
                window.location.href = "/login";
              }
            }, 2000);
          } else {
            errorMessage = err.error;
            if (err.errorDescription) {
              errorMessage += `: ${err.errorDescription}`;
            }
          }
        } else if (typeof err === "string") {
          errorMessage = err;
        } else if (err.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      if (result && result.accessToken && result.idToken) {
        // Stocker les tokens
        localStorage.setItem("auth0_access_token", result.accessToken);
        localStorage.setItem("auth0_id_token", result.idToken);

        // Récupérer les informations utilisateur
        auth0Client.client.userInfo(
          result.accessToken,
          (err: any, userInfo: any) => {
            if (err) {
              console.error("Error getting user info:", err);
              setError(
                "Erreur lors de la récupération des informations utilisateur"
              );
              setIsLoading(false);
              return;
            }

            if (userInfo) {
              const adaptedUser: Auth0User = {
                sub: userInfo.sub,
                email: userInfo.email,
                name: userInfo.name,
                email_verified: userInfo.email_verified || false,
                picture: userInfo.picture,
              };

              // Créer l'utilisateur dans le backend GraphQL
              createAuth0User({
                variables: {
                  name: userInfo.name,
                  email: userInfo.email,
                  city: userInfo.city || "Paris", // Ville par défaut si non fournie
                },
              })
                .then((result: any) => {
                  console.log(
                    "User created in backend:",
                    result.data?.createAuth0User
                  );

                  localStorage.setItem(
                    "auth0_user",
                    JSON.stringify(adaptedUser)
                  );
                  setUser(adaptedUser);
                  setIsAuthenticated(true);

                  // Rediriger vers le dashboard
                  router.push("/dashboard");
                })
                .catch((err: any) => {
                  console.error("Error creating user in backend:", err);
                  // Même en cas d'erreur, on continue avec l'authentification Auth0
                  localStorage.setItem(
                    "auth0_user",
                    JSON.stringify(adaptedUser)
                  );
                  setUser(adaptedUser);
                  setIsAuthenticated(true);
                  router.push("/dashboard");
                });
            }
          }
        );
      }

      setIsLoading(false);
    });
  };

  const clearAuth0Data = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth0_access_token");
      localStorage.removeItem("auth0_id_token");
      localStorage.removeItem("auth0_user");
    }
  };

  const logout = () => {
    // Nettoyer le localStorage
    clearAuth0Data();

    setUser(null);
    setIsAuthenticated(false);

    // Déconnexion Auth0
    auth0Client.logout({
      returnTo: window.location.origin,
    });
  };

  const getCurrentUser = () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("auth0_user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };

  return {
    login,
    logout,
    handleAuthCallback,
    getCurrentUser,
    clearAuth0Data,
    isAuthenticated,
    user,
    isLoading,
    error,
  };
}
