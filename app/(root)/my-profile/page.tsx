"use client";

import { LoadingSpinner, LoadingPage } from "@/components/home/LoadingSpinner";
import { sampleBooks } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UserProfile from "@/components/my-profile/UserProfile";
import { BorrowedBookSection } from "@/components/my-profile/BorrowedBookSection";

export default function MyProfile() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/sign-in`);
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully", {
        style: { backgroundColor: "green", color: "#fff" },
      });
    } catch (error: any) {
      toast.error("Logout failed", {
        description:
          error.data?.message || "Something went wrong, please try again.",
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return <LoadingPage text="Loading your profile..." />;
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
    <main className=" mx-auto lg:px-4 py-6 md:py-8 flex flex-col xl:flex-row gap-6 xl:gap-8 2xl:gap-12">
      {/* User Profile Section */}
      <UserProfile
        user={user}
        handleLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      {/* Borrowed Books Section */}
      <BorrowedBookSection />
    </main>
  );
}
