"use client";

import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "@/types";

export function AdminSideBar({ userDetails }: { userDetails: User | null }) {
  const user = userDetails;
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={37}
            width={37}
          />
          <h1>BookWise</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={` "object-contain",
                        ${isSelected ? "brightness-0 invert" : ""}`}
                    />
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
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

        <div className="flex flex-col max-md:hidden ">
          <p className="font-semibold text-dark-200">{user?.name}</p>
          <p className="text-light-500 text-xs">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
