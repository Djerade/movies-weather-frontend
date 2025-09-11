"use client";

import { LOGIN_MUTATION, SIGNUP_MUTATION } from "@/lib/graphql/mutations";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Créer un client Apollo local pour les mutations d'authentification
  const client = new ApolloClient({
    link: createHttpLink({
      uri: "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache(),
  });

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await client.mutate<{
        login: {
          id: string;
          email: string;
          name: string;
        };
      }>({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });

      if (data?.login) {
        // Générer un token simulé (en attendant que le backend retourne un vrai token)
        const token = `token_${data.login.id}_${Date.now()}`;

        // Stocker le token et l'utilisateur dans localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.login));

        // Rediriger vers le dashboard ou la page principale
        router.push("/dashboard");
        return { success: true, user: data.login };
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur de connexion";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }

    return { success: false, error: "Erreur inconnue" };
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    city: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await client.mutate<{
        signup: {
          id: string;
          email: string;
          name: string;
        };
      }>({
        mutation: SIGNUP_MUTATION,
        variables: { name, email, password, city },
      });

      if (data?.signup) {
        // Générer un token simulé (en attendant que le backend retourne un vrai token)
        const token = `token_${data.signup.id}_${Date.now()}`;

        // Stocker le token et l'utilisateur dans localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.signup));

        // Rediriger vers le dashboard ou la page principale
        router.push("/dashboard");
        return { success: true, user: data.signup };
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur d'inscription";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }

    return { success: false, error: "Erreur inconnue" };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const getCurrentUser = () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };

  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  };

  return {
    login,
    signup,
    logout,
    getCurrentUser,
    isAuthenticated,
    isLoading,
    error,
  };
}
