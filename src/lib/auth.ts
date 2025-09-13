import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Appel GraphQL pour l'authentification
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
              "http://localhost:4000/graphql",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                  mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                      id
                      email
                      name
                      city
                      token
                    }
                  }
                `,
                variables: {
                  email: credentials.email,
                  password: credentials.password,
                },
              }),
            }
          );

          if (!response.ok) {
            console.error("GraphQL request failed:", response.status);
            return null;
          }

          const result = await response.json();

          if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            return null;
          }

          const user = result.data?.login;

          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              city: user.city,
            };
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
