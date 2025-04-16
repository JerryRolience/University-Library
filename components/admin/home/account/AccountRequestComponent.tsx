"use client";

import { Button } from "@/components/ui";
import React from "react";
import { Spinner } from "@/components/home/Spiner";
import { LeftNoResult } from "../LeftNoResults";
import { useUserContext } from "@/contexts/UserContext";
import { IKImage } from "imagekitio-next";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import config from "@/lib/config";
import { getColorVariantsFromName } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AccountRequestComponent() {
  const router = useRouter();
  const { users, loadingUsers, errorUsers } = useUserContext();
  const accountRequestUsers = users.filter((u) => u.status === "PENDING");

  if (errorUsers) {
    return toast.error(errorUsers, {
      description: "Something went wrong, please try again.",
      style: { backgroundColor: "red", color: "#fff" },
    });
  }

  if (accountRequestUsers.length <= 0) {
    return <LeftNoResult type="Account Requests" />;
  }

  return (
    <div className="flex-1 bg-white rounded-2xl shadow p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold mb-4">Account Requests</h3>
        <Button
          onClick={() => router.push("/admin/account-requests")}
          className="text-primary-admin bg-[#F8F8FF] hover:bg-primary-admin/15"
        >
          View All
        </Button>
      </div>

      {loadingUsers && <Spinner />}

      <div className="flex flex-wrap gap-4">
        {accountRequestUsers.slice(0, 5).map((user, index) => {
          const { bg, text } = getColorVariantsFromName(user.name || "UN");

          return (
            <div key={index} className="w-[calc(33.333%-1rem)]">
              <div className="flex flex-col items-center justify-center gap-4 bg-light-300 py-3 rounded-md">
                <div className="w-[60px] h-[60px]  rounded-full overflow-hidden relative flex-shrink-0">
                  {user.profilePic ? (
                    <IKImage
                      path={user.profilePic}
                      urlEndpoint={config.env.imagekit.urlEndpoint}
                      alt={`Profile picture of ${user.name}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <Avatar className="w-full h-full">
                      <AvatarFallback
                        className={`${bg} ${text} font-bold text-xl flex items-center justify-center w-full h-full`}
                      >
                        {user.name
                          ? user.name
                              .split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")
                          : "UN"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-xs text-[#64748B] -mt-4 ">{user.email}</p>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
