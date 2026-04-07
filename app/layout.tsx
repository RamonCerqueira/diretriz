import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diretriz Arquitetura e Engenharia",
  description: "Landing page institucional da Diretriz Arquitetura e Engenharia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
