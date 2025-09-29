import auth0 from "auth0-js";

// Configuration Auth0
export const auth0Config = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "",
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "",
  redirectUri:
    process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/callback`
      : "http://localhost:3000/callback"),
  responseType: "token id_token",
  scope: "openid profile email",
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE, // Optionnel
};

// Vérification de la configuration
if (!auth0Config.domain || !auth0Config.clientID) {
  console.error(
    "❌ Configuration Auth0 manquante. Vérifiez votre fichier .env.local"
  );
  console.error("Domain:", auth0Config.domain);
  console.error("ClientID:", auth0Config.clientID);
}

// Instance Auth0
export const auth0Client = new auth0.WebAuth(auth0Config);

// Types pour Auth0
export interface Auth0Result {
  accessToken: string;
  idToken: string;
  expiresIn: number;
  tokenType: string;
}
