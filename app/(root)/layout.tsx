"use client";

import { HomeHeader } from "@/components/home";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchRequest } from "@/lib/api";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const updateLastActivity = async () => {
      if (isAuthenticated && storedToken) {
        const response = await fetchRequest(
          `${process.env.NEXT_PUBLIC_API}/user/update-last-activity`,
          "GET",
          undefined,
          storedToken
        );

        if (!response.ok) {
          console.error("Failed to update last activity");
        }
      }
    };

    updateLastActivity();
  }, [isAuthenticated, storedToken]);

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <HomeHeader />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
