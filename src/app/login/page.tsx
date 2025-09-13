"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "3rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "450px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            opacity: "0.1",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
            borderRadius: "50%",
            opacity: "0.1",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: "1" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
              }}
            >
              <span style={{ fontSize: "2rem" }}>🎬</span>
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bon retour !
            </h1>
            <p style={{ color: "#718096", fontSize: "1.1rem" }}>
              Connectez-vous pour accéder à votre tableau de bord
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#fed7d7",
                border: "1px solid #feb2b2",
                borderRadius: "12px",
                color: "#c53030",
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "0.5rem", fontSize: "1.2rem" }}>
                ⚠️
              </span>
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  fontWeight: "600",
                  color: "#2d3748",
                  fontSize: "0.95rem",
                }}
              >
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                style={{
                  width: "100%",
                  padding: "1rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  color: "#2d3748",
                  backgroundColor: "#ffffff",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  outline: "none",
                }}
                onFocus={e => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  fontWeight: "600",
                  color: "#2d3748",
                  fontSize: "0.95rem",
                }}
              >
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                required
                style={{
                  width: "100%",
                  padding: "1rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  color: "#2d3748",
                  backgroundColor: "#ffffff",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  outline: "none",
                }}
                onFocus={e => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "1rem",
                background: isLoading
                  ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: isLoading
                  ? "none"
                  : "0 5px 15px rgba(102, 126, 234, 0.4)",
              }}
              onMouseOver={e => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(102, 126, 234, 0.5)";
                }
              }}
              onMouseOut={e => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(102, 126, 234, 0.4)";
                }
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Connexion...
                </div>
              ) : (
                "Se connecter"
              )}
            </button>

            <div
              style={{
                textAlign: "center",
                padding: "1.5rem 0",
                borderTop: "1px solid #e2e8f0",
                marginTop: "1rem",
              }}
            >
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.95rem",
                  margin: "0 0 1rem 0",
                }}
              >
                Pas encore de compte ?
              </p>
              <a
                href="/signup"
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  transition: "transform 0.2s ease",
                  boxShadow: "0 3px 10px rgba(253, 121, 168, 0.3)",
                }}
                onMouseOver={e =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseOut={e =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Créer un compte
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
