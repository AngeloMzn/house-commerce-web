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
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Error403 />;
  }

  return <>{children}</>;
}

export default function RootLayoutAuthenticated({ children }: RootLayoutAuthenticatedProps) {
  return (
    <SessionProvider>
      <html lang="pt-br">
        <body>
          <AuthenticatedContent>{children}</AuthenticatedContent>
        </body>
      </html>
    </SessionProvider>
  );
}