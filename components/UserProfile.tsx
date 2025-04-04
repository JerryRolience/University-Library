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

export default function UserProfile({
  user,
  handleLogout,
  isLoggingOut,
}: {
  user: User | null;
  handleLogout: () => void;
  isLoggingOut: boolean;
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
          />
        </div>
      </div>

      {/* User Profile Content */}
      <div className="flex flex-col gap-6 md:gap-8 pt-16 flex-1">
        {/* User Profile Header */}
        <div className="flex flex-row items-start gap-4 sm:gap-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 min-w-[5rem] sm:min-w-[6rem] rounded-full border-[4px] sm:border-[6px] border-dark-300 overflow-hidden">
            <Image
              src={"/images/test-user.jpg"}
              alt={`Profile picture of ${user?.name}`}
              fill
              className="object-cover"
              priority
            />
          </div>

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
          <div className="relative w-full aspect-[486/287]">
            <Image
              src="/images/image.png"
              alt="Student identification card"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 grid grid-cols-2 sm:flex justify-between gap-3 sm:gap-4">
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-dark-400 hover:bg-dark-500 rounded-lg text-light-100 transition-colors text-sm sm:text-base"
            aria-label="Edit profile"
          >
            <FiEdit2 size={16} className="shrink-0" />
            <span className="truncate">Edit Profile</span>
          </button>
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-dark-400 hover:bg-dark-500 rounded-lg text-light-100 transition-colors text-sm sm:text-base"
            aria-label="Settings"
          >
            <IoSettingsOutline size={16} className="shrink-0" />
            <span className="truncate">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="col-span-2 sm:col-auto flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors text-sm sm:text-base"
            aria-label="Log out"
          >
            <IoLogOutOutline size={16} className="shrink-0" />
            <span className="truncate">
              {isLoggingOut ? "Logging out..." : "Log out"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
