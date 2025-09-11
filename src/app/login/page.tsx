export default function LoginPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Welcome Back
        </h1>
        <p style={{ color: "#666" }}>Sign in to your account to continue</p>
      </div>

      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#666" }}>
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            style={{ color: "#3182ce", textDecoration: "underline" }}
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
