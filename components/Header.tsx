"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";

const Header = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchRequest(
          `${process.env.NEXT_PUBLIC_API}/api/auth/current-user`,
          "GET"
        );

        console.log("res", res);
        if (res.ok && res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        toast.error("Failed to fetch user", {
          description: "Unexpected error occured. Please try again",
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/user/logout`,
        "GET"
      );

      if (res.ok) {
        setUser(null);
        toast.success("Logged out successfully", {
          style: { backgroundColor: "green", color: "#fff" },
        });
        router.replace("/sign-in");
      } else {
        toast.error("Logout failed", {
          description: "Please try again",
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          typeof error === "string" ? error : "An unexpected error occurred",
        style: { backgroundColor: "red", color: "#fff" },
      });
    }
  };

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
              "text-base cursor-pointer capitalize",
              pathName === "/library" ? "text-light-200 " : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/my-profile">
                <Avatar>
                  <AvatarFallback className="bg-amber-100 w-8 h-8">
                    {user.name
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
                className={cn(
                  "hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600",
                  pathName === "/my-profile" && " hidden md:hidden lg:hidden"
                )}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/sign-in"
              className={cn(
                "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",
                pathName === "/my-profile" && " hidden md:hidden lg:hidden"
              )}
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
