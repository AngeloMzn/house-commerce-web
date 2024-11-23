'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionWrapperProps {
    children: React.ReactNode;
}

export default function SessionWrapper({children}: SessionWrapperProps) {
  return (
    <SessionProvider session={null}>
      {children}
    </SessionProvider>
  );
}