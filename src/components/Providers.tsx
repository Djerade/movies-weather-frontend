"use client";

import { client } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";
import { SessionProvider } from "next-auth/react";
import ClientNavbar from "./ClientNavbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ClientNavbar />
        {children}
      </ApolloProvider>
    </SessionProvider>
  );
}
