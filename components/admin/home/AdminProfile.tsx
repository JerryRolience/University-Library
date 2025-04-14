import config from "@/lib/config";
import { User } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { IKImage } from "imagekitio-next";
import React from "react";

export function AdminProfile({ user }: { user: User | null }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-16 h-16 rounded-full overflow-hidden relative flex items-center justify-center text-white text-sm font-medium">
        {user?.profilePic ? (
          <IKImage
            path={user?.profilePic}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={`Profile picture of ${user.name}`}
            width={44}
            height={44}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarFallback className="bg-blue-400  text-gray-800 font-medium">
              {user?.name
                ? user?.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                : "UN"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="flex flex-col ">
        <h2 className="text-2xl font-semibold text-dark-400">{user?.name}</h2>
        <p className="text-slate-500 text-base ">
          Monitor all of your users and books here
        </p>
      </div>
    </div>
  );
}
