"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <header className="my-10 flex justify-between items-center">
        <Link href="/">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        </Link>
        <div className="flex items-center gap-6">
          <LoadingSpinner size="sm" className="text-white" />
        </div>
      </header>
    );
  }

  return (
    <header className="my-10 flex justify-between items-center">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex items-center gap-6">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize transition-colors",
              pathname === "/library"
                ? "text-light-200 font-medium"
                : "text-light-100 hover:text-light-200"
            )}
          >
            Library
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link
                href="/my-profile"
                className="hover:opacity-80 transition-opacity"
              >
                <Avatar>
                  <AvatarFallback className="bg-amber-100 w-8 h-8 text-gray-800 font-medium">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "IN"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={cn(
                  "hidden md:flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors",
                  pathname === "/my-profile" && "hidden",
                  isLoggingOut && "opacity-80"
                )}
              >
                {isLoggingOut ? (
                  <>
                    <LoadingSpinner size="sm" className="text-white" />
                    <span>Logging out</span>
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/sign-in"
              className={cn(
                "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors",
                pathname === "/my-profile" && "hidden"
              )}
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
