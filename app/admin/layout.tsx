"use client";

import { LoadingPage, LoadingSpinner } from "@/components/home/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import "@/styles/admin.css";
import SideBar from "@/components/admin/SideBar";
import Header from "@/components/admin/Header";

const layout = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/sign-in`);
    }
    if (user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

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
      <SideBar userDetails={user} />

      {/* Main content area */}
      <div className="admin-container">
        <Header userDetails={user} />
        {children}
      </div>
    </main>
  );
};

export default layout;
