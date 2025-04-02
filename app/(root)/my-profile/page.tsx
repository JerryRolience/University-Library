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
    <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 xl:gap-20">
      {/* User Profile Section */}
      <div className="w-full lg:w-[566px] h-auto lg:h-[768px] bg-gradient-to-b from-dark-300 to-[#12141D] rounded-2xl p-6 lg:p-8 flex flex-col">
        {/* Profile decoration clip - only show on larger screens */}
        <div className="hidden lg:block absolute left-52 lg:left-[600px] top-[212px] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Image
              src={"/images/user-clip.png"}
              alt="User Profile"
              width={59}
              height={88}
              className="object-cover"
            />
          </div>
        </div>

        {/* User Profile Content */}
        <div className="flex flex-col gap-8 flex-1 pt-6 lg:pt-12">
          {/* User Profile Header - always in row */}
          <div className="flex flex-row items-start gap-6">
            <div className="relative w-24 h-24 min-w-[6rem] rounded-full border-[6px] border-dark-300 overflow-hidden">
              <Image
                src={"/images/test-user.jpg"}
                alt={`Profile picture of ${user?.name || "user"}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
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

              <h1 className="text-2xl font-bold text-light-100">
                {user?.name || "Jerry Rolience"}
              </h1>
              <p className="text-base text-light-100">
                {user?.email || "Email not provided"}
              </p>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-light-100">Role</h2>
              <p className="text-base text-light-100">
                {user?.role || "Not specified"}
              </p>
            </div>

            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-light-100">
                University ID Number
              </h2>
              <p className="text-base text-light-100">
                {user?.role || "Not provided"}
              </p>
            </div>
          </div>

          {/* ID Card */}
          <div className="mt-4">
            <Image
              src="/images/image.png"
              alt="Student identification card"
              width={486}
              height={287}
              className="w-full h-auto max-w-full object-cover rounded-md"
            />
          </div>

          {/* Action Buttons - appears at bottom on larger screens */}
          <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-400 hover:bg-dark-500 rounded-lg text-light-100 transition-colors"
              aria-label="Edit profile"
            >
              <FiEdit2 size={18} />
              <span>Edit Profile</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-400 hover:bg-dark-500 rounded-lg text-light-100 transition-colors"
              aria-label="Settings"
            >
              <IoSettingsOutline size={18} />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
              aria-label="Log out"
            >
              <IoLogOutOutline size={18} />
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Borrowed Books Section */}
      <div className="w-full lg:flex-1 mt-6 lg:mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-light-100">Borrowed Books</h2>
          <button className="text-sm text-light-200 hover:text-light-100 transition-colors">
            View All
          </button>
        </div>

        {sampleBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleBooks.map((item) => (
              <article
                key={item.id}
                className="bg-gradient-to-b from-[#12141D] to-[#12151F] p-5 flex flex-col gap-5 rounded-lg"
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

                <div className="flex flex-col gap-2">
                  <h3
                    id={`book-${item.id}-title`}
                    className="text-lg font-medium text-light-100"
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-light-200">{item.genre}</p>
                </div>

                <div className="mt-auto w-full space-y-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/book.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="object-contain"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-light-100">Borrowed on Dec 31</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/calendar.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="object-contain"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-light-100">
                        11 days left to return
                      </p>
                    </div>
                    <button
                      aria-label={`View receipt for ${item.title}`}
                      className="text-light-100 hover:text-light-200 transition-colors"
                    >
                      <IoReceipt size={20} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-dark-300 rounded-lg p-8 text-center">
            <p className="text-light-200">You haven't borrowed any books yet</p>
            <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-light-100 transition-colors">
              Browse Books
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
