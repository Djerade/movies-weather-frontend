"use client";

import { client } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import ClientNavbar from "./ClientNavbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const shouldShowNavbar =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/movies");

  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        {shouldShowNavbar && <ClientNavbar />}
        {children}
      </ApolloProvider>
    </SessionProvider>
  );
}
