"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Éviter l'erreur d'hydratation en ne rendant rien jusqu'à ce que le composant soit monté côté client
  if (!mounted || !isAuthenticated()) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#3182ce",
        color: "white",
        padding: "0.5rem 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a
            href="/dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            onMouseOver={e =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={e => (e.currentTarget.style.textDecoration = "none")}
          >
            Dashboard
          </a>
          <a
            href="/movies"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            onMouseOver={e =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={e => (e.currentTarget.style.textDecoration = "none")}
          >
            Films
          </a>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
