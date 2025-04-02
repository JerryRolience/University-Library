"use client";

import { LoadingSpinner, LoadingPage } from "@/components/LoadingSpinner";
import { sampleBooks } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { IoReceipt, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";

export default function MyProfile() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/sign-in`);
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return <LoadingPage text="Loading your profile..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh]">
        <LoadingSpinner
          size="lg"
          className="text-white"
          text="Redirecting to login..."
        />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 md:py-8 flex flex-col xl:flex-row gap-6 xl:gap-8 2xl:gap-12">
      {/* User Profile Section */}
      <div className="w-full relative xl:w-[566px] lg:h-[840px] h-auto bg-gradient-to-b from-dark-300 to-[#12141D] rounded-2xl px-4 py-6 sm:px-6 sm:py-8 lg:p-8 flex flex-col">
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
                alt={`Profile picture of ${user?.name || "user"}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 sm:gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/Vector.png"
                  alt="Verified badge"
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Verified Student
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-light-100">
                {user?.name || "Jerry Rolience"}
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
                {user?.role || "Not provided"}
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

      {/* Borrowed Books Section */}
      <div className="w-full xl:flex-1">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-light-100">
            Borrowed Books
          </h2>
          <button className="text-xs sm:text-sm text-light-200 hover:text-light-100 transition-colors">
            View All
          </button>
        </div>

        {sampleBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sampleBooks.map((item) => (
              <article
                key={item.id}
                className="bg-gradient-to-b from-[#12141D] to-[#12151F] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 rounded-lg"
                aria-labelledby={`book-${item.id}-title`}
              >
                <div className="relative w-full aspect-[240/247]">
                  <Image
                    src={item.cover}
                    alt={`Cover of ${item.title}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3
                    id={`book-${item.id}-title`}
                    className="text-base sm:text-lg font-medium text-light-100 line-clamp-2"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-light-200">
                    {item.genre}
                  </p>
                </div>

                <div className="mt-auto w-full space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/book.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="object-contain bg-green-400"
                      aria-hidden="true"
                    />
                    <p className="text-xs sm:text-sm text-light-100">
                      Borrowed on Dec 31
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/calendar.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="object-contain"
                        aria-hidden="true"
                      />
                      <p className="text-xs sm:text-sm text-light-100">
                        11 days left to return
                      </p>
                    </div>
                    <button
                      aria-label={`View receipt for ${item.title}`}
                      className="text-light-100 hover:text-light-200 transition-colors"
                    >
                      <IoReceipt size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-dark-300 rounded-lg p-6 sm:p-8 text-center">
            <p className="text-light-200 text-sm sm:text-base">
              You haven't borrowed any books yet
            </p>
            <button className="mt-3 sm:mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-light-100 transition-colors text-sm sm:text-base">
              Browse Books
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
