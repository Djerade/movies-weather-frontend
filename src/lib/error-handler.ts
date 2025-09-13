// Utilitaire pour gérer les erreurs GraphQL de manière cohérente

export interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
    originalError?: any;
  };
}

export function handleGraphQLError(error: any): string {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    
    // Gestion spécifique des erreurs connues
    if (graphQLError.message.includes("already in favorites")) {
      return "Ce film est déjà dans vos favoris";
    }
    
    if (graphQLError.message.includes("Movie not found")) {
      return "Film introuvable";
    }
    
    if (graphQLError.message.includes("User not found")) {
      return "Utilisateur introuvable";
    }
    
    if (graphQLError.message.includes("Unauthorized")) {
      return "Vous devez être connecté pour effectuer cette action";
    }
    
    // Retourner le message d'erreur par défaut
    return graphQLError.message;
  }
  
  if (error.networkError) {
    return "Erreur de connexion au serveur";
  }
  
  return "Une erreur inattendue s'est produite";
}

export function showErrorToast(message: string) {
  // Pour l'instant, on utilise alert, mais on pourrait intégrer un système de toast
  alert(`❌ ${message}`);
}

export function showSuccessToast(message: string) {
  // Pour l'instant, on utilise alert, mais on pourrait intégrer un système de toast
  alert(`✅ ${message}`);
}
