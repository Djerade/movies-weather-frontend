"use client";

import { useAuth0 } from './useAuth0';

export function useUnifiedAuth() {
  const auth0Auth = useAuth0();

  return {
    // Méthodes d'authentification
    login: (mode: 'login' | 'signup' = 'login') => auth0Auth.login(mode),
    signup: () => auth0Auth.login('signup'),
    logout: auth0Auth.logout,
    handleAuthCallback: auth0Auth.handleAuthCallback,
    
    // État
    getCurrentUser: auth0Auth.getCurrentUser,
    isAuthenticated: auth0Auth.isAuthenticated,
    isLoading: auth0Auth.isLoading,
    error: auth0Auth.error,
    
    // Données utilisateur Auth0
    user: auth0Auth.user,
  };
}
