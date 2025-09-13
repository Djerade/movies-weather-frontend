# Configuration de l'Authentification

## Variables d'Environnement Requises

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```bash
# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## Utilisateur de Test

Un utilisateur de test a été créé avec les credentials suivants :
- **Email** : `test@example.com`
- **Mot de passe** : `password123`

## Problèmes Résolus

1. ✅ **Conflit d'authentification** : Unifié sur NextAuth.js
2. ✅ **Schéma GraphQL** : Mis à jour pour correspondre au backend
3. ✅ **Configuration NextAuth** : Corrigée pour utiliser GraphQL
4. ✅ **Page de login** : Mise à jour pour utiliser NextAuth.js

## Test de Connexion

Vous pouvez maintenant vous connecter avec :
- Email : `test@example.com`
- Mot de passe : `password123`

L'application devrait rediriger vers `/dashboard` après une connexion réussie.
