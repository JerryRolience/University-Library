"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState } from "react";

export function HomeHeader() {
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
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className="flex items-center gap-6">
          <LoadingSpinner size="sm" className="text-white" />
        </div>
      </header>
    );
  }

  return (
    <header className="my-10 flex items-center  justify-between mx-4  md:mx-0">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex items-center gap-3 md:gap-6  ml-12  sm:ml-20   md:ml-[300px]  lg:ml-[500px]  xl:ml-[700px]">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize transition-colors",
              pathname === "/home"
                ? "text-light-200 font-medium"
                : "text-light-100 hover:text-light-200"
            )}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/search"
            className={cn(
              "text-base cursor-pointer capitalize transition-colors",
              pathname === "/search"
                ? "text-light-200 font-medium"
                : "text-light-100 hover:text-light-200"
            )}
          >
            Search
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link
                href="/my-profile"
                className="hover:opacity-80 transition-opacity flex items-center gap-2 "
              >
                <Avatar className="w-8 h-8 rounded-full">
                  <AvatarFallback className="bg-blue-400  text-gray-800 font-medium">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")
                      : "UN"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-light-100 font-bold ">
                  {user?.name ? user?.name.split(" ")[0] : ""}
                </p>
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
