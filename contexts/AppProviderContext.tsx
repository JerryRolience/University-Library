"use client";

import { Suspense } from "react";
import { AuthProvider } from "./AuthContext";

export default function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>{children}</AuthProvider>
    </Suspense>
  );
}
