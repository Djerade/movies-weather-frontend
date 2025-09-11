import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movies & Weather App",
  description: "A modern app for movies and weather information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
