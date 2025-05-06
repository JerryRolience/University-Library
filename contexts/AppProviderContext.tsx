"use client";

import React, { Suspense } from "react";
import { AuthProvider } from "./AuthContext";

export default function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-4 rounded-full bg-primary animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.8s",
                }}
              />
            ))}
          </div>
          <p className="text-lg font-medium text-foreground">Loading BookWise...</p>
        </div>
      }
    >
      <AuthProvider>{children}</AuthProvider>
    </Suspense>
  );
}
