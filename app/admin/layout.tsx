"use client";

import { LoadingPage, LoadingSpinner } from "@/components/home/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import "@/styles/admin.css";
import { UserProvider } from "@/contexts/UserContext";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { AdminHomeHeader } from "@/components/admin/home/AdminHeader";

const layout = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/sign-in");
      } else if (user && !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        router.push("/");
      }
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return <LoadingPage text="Loading admin page ..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh]">
        <LoadingSpinner
          size="lg"
          className="text-white"
          text="Redirecting to login..."
        />
      </div>
    );
  }

  return (
    <main className="flex flex-row min-h-screen w-full">
      {/* Sidebar */}
      <AdminSideBar userDetails={user} />

      {/* Main content area */}
      <div className="admin-container">
        <AdminHomeHeader userDetails={user} />
        <UserProvider> {children}</UserProvider>
      </div>
    </main>
  );
};

export default layout;
