'use client';
import type { Metadata } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import "../../app/styles/globals.css"



interface RootLayoutAuthenticatedProps {
  children: React.ReactNode;
}

function Error403() {
  return (
    <div>
      <h1>403 - Não autorizado</h1>
      <p>Você precisa estar logado para acessar esta página.</p>
    </div>
  );
}

function AuthenticatedContent({ children }: RootLayoutAuthenticatedProps) {
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  const session = localStorage.getItem('user');
  if (!session) {
    return <Error403 />;
  }

  return <>{children}</>;
}

export default function RootLayoutAuthenticated({ children }: RootLayoutAuthenticatedProps) {
  return (
      <html lang="pt-br">
        <body>
          <AuthenticatedContent>{children}</AuthenticatedContent>
        </body>
      </html>
  );
}