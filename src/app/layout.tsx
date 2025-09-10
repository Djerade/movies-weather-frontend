import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { AuthProvider } from '@/lib/auth-provider';
import { ChakraProviderWrapper } from '@/lib/theme';
import { ThemeProvider } from '@/lib/theme-context';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movies & Weather App',
  description: 'A modern app for movies and weather information',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChakraProviderWrapper>
          <ThemeProvider>
            <ApolloWrapper>
              <AuthProvider>{children}</AuthProvider>
            </ApolloWrapper>
          </ThemeProvider>
        </ChakraProviderWrapper>
      </body>
    </html>
  );
}
