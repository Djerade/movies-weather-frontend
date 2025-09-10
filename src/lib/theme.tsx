'use client';

import { ChakraProvider, defaultSystem, defineConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

// Configuration du thème avec support des modes clair et sombre
const config = defineConfig({
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'chakra',
});

// Créer un système personnalisé avec la configuration
const customSystem = {
  ...defaultSystem,
  config,
};

export const ChakraProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider value={customSystem}>{children}</ChakraProvider>;
};
