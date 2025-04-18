import { User } from "@/types";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { JSX } from "react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { FaUserEdit } from "react-icons/fa";
import { ActionButtons } from "./ActionButtons";

export default function UserProfile({
  user,
  handleLogout,
  isLoggingOut,
  handleProfileEdit,
  handleProfilePicEdit,
}: {
  user: User | null;
  handleLogout: () => void;
  isLoggingOut: boolean;
  handleProfileEdit: () => void;
  handleProfilePicEdit: () => void;
}) {
  // Status color mapping
  const statusConfig: Record<
    "APPROVED" | "PENDING" | "REJECTED" | "DEFAULT",
    { bg: string; text: string; label: string; icon: JSX.Element }
  > = {
    APPROVED: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      label: "Verified Student",
      icon: <FaCheckCircle className="text-emerald-400" size={16} />,
    },
    PENDING: {
      bg: "bg-amber-500/20",
      text: "text-amber-400",
      label: "Verification Pending",
      icon: <FaClock className="text-amber-400" size={16} />,
    },
    REJECTED: {
      bg: "bg-rose-500/20",
      text: "text-rose-400",
      label: "Verification Rejected",
      icon: <FaTimesCircle className="text-rose-400" size={16} />,
    },
    DEFAULT: {
      bg: "bg-blue-500/20",
      text: "text-blue-400",
      label: "Account Status",
      icon: <FaInfoCircle className="text-blue-400" size={16} />,
    },
  };

  const currentStatus: "APPROVED" | "PENDING" | "REJECTED" | "DEFAULT" =
    (user?.status as "APPROVED" | "PENDING" | "REJECTED" | "DEFAULT") ||
    "DEFAULT";
  const { bg, text, label, icon } = statusConfig[currentStatus];
  statusConfig[currentStatus] || statusConfig.DEFAULT;

  return (
    <div className="w-full relative xl:w-[566px] lg:h-[840px] h-auto bg-gradient-to-b from-dark-300 to-[#12141D] rounded-2xl px-4 py-6  lg:p-8 flex flex-col">
      {/* Profile decoration clip - centered for all screens */}
      <div className="absolute left-1/2 -top-4 transform -translate-x-1/2">
        <div className="relative">
          <Image
            src={"/images/user-clip.png"}
            alt="User Profile decoration"
            width={59}
            height={88}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* User Profile Content */}
      <div className="flex flex-col gap-6 md:gap-8 pt-16 flex-1">
        {/* User Profile Header */}
        <div className="flex flex-row items-start gap-4 sm:gap-6">
          <div className="relative w-20 h-20 bg-dark-100 sm:w-24 sm:h-24 min-w-[5rem] sm:min-w-[6rem] rounded-full border-[4px] sm:border-[6px] border-dark-300 overflow-hidden">
            {user?.profilePic ? (
              <IKImage
                path={user?.profilePic}
                urlEndpoint={config.env.imagekit.urlEndpoint}
                alt={`Profile picture of ${user?.name}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="text-white items-center text-lg p-7">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* User Name and Status */}
          <div className="flex-1 flex flex-col gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {icon}
                <span
                  className={`text-xs ${bg} ${text} px-2 py-1 rounded-full`}
                >
                  {label}
                </span>
              </div>
              <div className="ml-4  cursor-pointer">
                <FaUserEdit
                  color="#E7C9A5"
                  size={24}
                  onClick={handleProfilePicEdit}
                />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-light-100">
              {user?.name || "Name not provided"}
            </h1>
            <p className="text-sm sm:text-base text-light-100">
              {user?.email || "Email not provided"}
            </p>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col">
            <h2 className="text-sm sm:text-base font-semibold text-light-100">
              Role
            </h2>
            <p className="text-sm sm:text-base text-light-100">
              {user?.role || "Not specified"}
            </p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-sm sm:text-base font-semibold text-light-100">
              University ID Number
            </h2>
            <p className="text-sm sm:text-base text-light-100">
              {user?.universityID || "Not provided"}
            </p>
          </div>
        </div>

        {/* ID Card */}
        <div className="mt-4">
          <div className="relative w-full aspect-[486/287] rounded-md overflow-hidden">
            <IKImage
              path={user?.universityCard}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt="Student identification card"
              fill
              className="object-cover"
              loading="lazy"
              style={{
                objectPosition: " center bottom",
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          isLoggingOut={isLoggingOut}
          handleLogout={handleLogout}
          handleProfileEdit={handleProfileEdit}
        />
      </div>
    </div>
  );
}
