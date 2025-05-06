"use client";

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BadgeCheck, ChevronsUpDown, Home, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "../home";

export function AdminSideBar({ userDetails }: { userDetails: User | null }) {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully", {
        style: { backgroundColor: "green", color: "#fff" },
      });
    } catch (error: any) {
      toast.error("Logout failed", {
        description: error.data?.message || "Something went wrong, please try again.",
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
          <h1>BookWise</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected = (link.route !== "/admin" && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div className={cn("link", isSelected && "bg-primary-admin shadow-sm")}>
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={` "object-contain",
                        ${isSelected ? "brightness-0 invert" : ""}`}
                    />
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>{link.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Dropdown */}
      <div className="mb-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="mt-auto flex h-12 w-full items-center justify-between rounded-lg px-3 hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userDetails?.profilePic} />
                  <AvatarFallback className="bg-blue-100 text-gray-800 font-medium">
                    {userDetails?.name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("") || "UN"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-start max-md:hidden">
                  <p className="text-sm font-medium text-gray-800">{userDetails?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{userDetails?.email || "user@example.com"}</p>
                </div>
              </div>

              <ChevronsUpDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="z-50 min-w-[200px] rounded-md border bg-white p-1 shadow-lg" align="end" sideOffset={8}>
            <DropdownMenuLabel className="p-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userDetails?.profilePic} />
                  <AvatarFallback className="bg-blue-100">
                    {userDetails?.name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("") || "UN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userDetails?.name}</p>
                  <p className="text-xs text-gray-500">{userDetails?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100" onClick={() => router.push("/my-profile")}>
                <BadgeCheck className="h-4 w-4 text-gray-600" />
                <span>Account</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100" onClick={() => router.push("/")}>
              <Home className="h-4 w-4 text-gray-600" />
              <span>Public Page</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-red-50" onClick={handleLogout}>
              {isLoggingOut ? <LoadingSpinner size="sm" className="text-white" /> : <LogOut className="h-4 w-4" />}
              {isLoggingOut ? <span>logging out...</span> : <span>Log out</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
