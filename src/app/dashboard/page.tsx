"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { getCurrentUser, isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const currentToken = localStorage.getItem("token");
    setUser(currentUser);
    setToken(currentToken);
  }, [getCurrentUser]);

  const handleLogout = () => {
    logout();
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
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Déconnexion
        </button>
      </div>

      <div style={{ display: "grid", gap: "2rem" }}>
        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>Informations utilisateur</h2>
          {user ? (
            <div>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Nom:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ) : (
            <p>Aucune information utilisateur trouvée</p>
          )}
        </div>

        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>Token d&apos;authentification</h2>
          {token ? (
            <div>
              <p>
                <strong>Token:</strong> {token}
              </p>
              <p>
                <strong>Statut:</strong>{" "}
                <span style={{ color: "green" }}>✓ Valide</span>
              </p>
            </div>
          ) : (
            <p style={{ color: "red" }}>Aucun token trouvé</p>
          )}
        </div>

        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>Statut d&apos;authentification</h2>
          <p>
            <strong>Authentifié:</strong>{" "}
            <span style={{ color: "green" }}>✓ Oui</span>
          </p>
          <p>
            <strong>localStorage user:</strong>{" "}
            {localStorage.getItem("user") ? "✓ Présent" : "✗ Absent"}
          </p>
          <p>
            <strong>localStorage token:</strong>{" "}
            {localStorage.getItem("token") ? "✓ Présent" : "✗ Absent"}
          </p>
        </div>
      </div>
    </div>
  );
}
