import { IKImage } from "imagekitio-next";
import { Avatar, AvatarFallback } from "../ui/avatar";
import config from "@/lib/config";
import { AllUser } from "@/types";

export function Profile({
  user,
}: {
  user: {
    profilePic: string;
    name: string;
    email: string;
  };
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden relative flex items-center justify-center text-white text-sm font-medium">
        {user?.profilePic ? (
          <IKImage
            path={user?.profilePic}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt={`Profile picture of ${user.name}`}
            width={40}
            height={40}
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
      <div className="truncate">
        <div className="font-medium text-sm truncate">{user.name}</div>
        <div className="text-gray-500 text-xs truncate">{user.email}</div>
      </div>
    </div>
  );
}
