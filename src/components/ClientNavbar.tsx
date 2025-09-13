"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ClientNavbar() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <nav
      style={{
        backgroundColor: "#f7fafc",
        padding: "1rem",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link
          href="/"
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#3182ce",
            textDecoration: "none",
          }}
        >
          Movies & Weather
        </Link>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {session && (
          <>
            <Link
              href="/dashboard"
              style={{ textDecoration: "none", color: "#4a5568" }}
            >
              Dashboard
            </Link>
            <Link
              href="/movies"
              style={{ textDecoration: "none", color: "#4a5568" }}
            >
              Films
            </Link>
          </>
        )}
      </div>

      <div>
        {status === "loading" ? (
          <span>Chargement...</span>
        ) : session ? (
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: "bold" }}>
              {session.user?.name}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                padding: "0.25rem 0.5rem",
                fontSize: "0.875rem",
                backgroundColor: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "#4a5568" }}
            >
              Se connecter
            </Link>
            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#3182ce",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
              }}
            >
              S&apos;inscrire
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
