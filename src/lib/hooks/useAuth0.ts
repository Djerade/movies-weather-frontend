"use client";

import { Auth0User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth0Client } from '../auth0-config';

export function useAuth0() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Auth0User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('auth0_access_token');
    const userStr = localStorage.getItem('auth0_user');
    
    if (token && userStr) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userStr));
    }
  };

  const login = (mode: 'login' | 'signup' = 'login') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Auth0 gère l'inscription via le même flux
      // On peut ajouter des paramètres pour personnaliser l'expérience
      const options: any = {};
      
      if (mode === 'signup') {
        // Forcer l'affichage du formulaire d'inscription
        options.screen_hint = 'signup';
      }
      
      auth0Client.authorize(options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion Auth0';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleAuthCallback = () => {
    setIsLoading(true);
    setError(null);

    auth0Client.parseHash((err: any, result: any) => {
      if (err) {
        console.error('Auth0 callback error:', err);
        setError(err.errorDescription || 'Erreur de callback Auth0');
        setIsLoading(false);
        return;
      }

      if (result && result.accessToken && result.idToken) {
        // Stocker les tokens
        localStorage.setItem('auth0_access_token', result.accessToken);
        localStorage.setItem('auth0_id_token', result.idToken);
        
        // Récupérer les informations utilisateur
        auth0Client.client.userInfo(result.accessToken, (err: any, userInfo: any) => {
          if (err) {
            console.error('Error getting user info:', err);
            setError('Erreur lors de la récupération des informations utilisateur');
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

            localStorage.setItem('auth0_user', JSON.stringify(adaptedUser));
            setUser(adaptedUser);
            setIsAuthenticated(true);
            
            // Rediriger vers le dashboard
            router.push('/dashboard');
          }
        });
      }
      
      setIsLoading(false);
    });
  };

  const logout = () => {
    // Nettoyer le localStorage
    localStorage.removeItem('auth0_access_token');
    localStorage.removeItem('auth0_id_token');
    localStorage.removeItem('auth0_user');
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Déconnexion Auth0
    auth0Client.logout({
      returnTo: window.location.origin
    });
  };

  const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('auth0_user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };

  return {
    login,
    logout,
    handleAuthCallback,
    getCurrentUser,
    isAuthenticated,
    user,
    isLoading,
    error,
  };
}
