"use client";

import { client } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import ClientNavbar from "./ClientNavbar";

const system = createSystem(defaultConfig);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ApolloProvider client={client}>
        <ClientNavbar />
        {children}
      </ApolloProvider>
    </ChakraProvider>
  );
}
