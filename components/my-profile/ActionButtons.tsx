"use client";

import { FiEdit2 } from "react-icons/fi";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function ActionButtons({ isLoggingOut, handleLogout, handleProfileEdit, email }: { isLoggingOut: boolean; handleLogout: () => void; handleProfileEdit: () => void; email: string }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  function handleAccountRecovery(email: string): void {
    console.log("Account recovery initiated for user ID:", email);
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      // Validate confirmation text first (if you have it)
      if (confirmationText !== "DELETE ACCOUNT") {
        throw new Error("Please type the confirmation phrase correctly");
      }

      const uri = `${process.env.NEXT_PUBLIC_API}/user/delete-user`;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetchRequest(uri, "POST", { email }, token);

      if (!response.ok) {
        throw new Error(response.data?.message || "Account deletion failed");
      }

      // Success handling
      toast.success("Account deleted", {
        description: "All your data has been permanently removed",
        action: {
          label: "Undo",
          onClick: () => handleAccountRecovery(email), // If you implement recovery
        },
        style: { backgroundColor: "green", color: "#fff" },
      });

      // Redirect after delay
      setTimeout(() => handleLogout(), 1500);
    } catch (error) {
      toast.error("Deletion failed", {
        description: error instanceof Error ? error.message : "Please try again later",
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setConfirmationText("");
    // Reset dropdown state when dialog closes
    // setDropdownOpen(true);
    setTimeout(() => setDropdownOpen(false), 0);
  };

  return (
    <>
      <div className="mt-6 pt-4 grid grid-cols-2 sm:flex justify-between gap-3 sm:gap-4">
        <button
          className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-dark-400 hover:bg-dark-500 rounded-lg text-light-100 transition-colors text-sm sm:text-base"
          aria-label="Edit profile"
          onClick={handleProfileEdit}
        >
          <FiEdit2 size={16} className="shrink-0" />
          <span className="truncate">Edit Profile</span>
        </button>

        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-dark-400 hover:bg-dark-500 rounded-lg text-light-100 transition-colors text-sm sm:text-base">
              <IoSettingsOutline size={16} className="shrink-0" />
              <span className="truncate">Settings</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-dark-400 border-dark-300" onInteractOutside={() => setDropdownOpen(false)}>
            <DropdownMenuLabel className="text-light-100">Account Settings</DropdownMenuLabel>

            {["ADMIN", "SUPER_ADMIN"].includes(user?.role!) && (
              <>
                <DropdownMenuSeparator className="bg-dark-300" />
                <DropdownMenuItem
                  className="focus:bg-primary-admin/20 focus:text-light-100 cursor-pointer"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  <span className="text-blue-100">Admins Page</span>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator className="bg-dark-300" />
            <DropdownMenuItem
              className="focus:bg-red-500/20 focus:text-red-400 cursor-pointer"
              onClick={() => {
                setDeleteDialogOpen(true);
                setDropdownOpen(false);
              }}
            >
              <span className="text-red-400">Delete Account</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="col-span-2 sm:col-auto flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors text-sm sm:text-base"
          aria-label="Log out"
        >
          <IoLogOutOutline size={16} className="shrink-0" />
          <span className="truncate">{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </button>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent
          className={`
          bg-gradient-to-b from-dark-300 to-[#12141D] border-dark-100 w-[calc(100vw-2rem)]  max-w-[95vw] sm:max-w-[425px] mx-auto px-4 sm:px-6 py-6 rounded-lg            
        `}
        >
          <DialogHeader>
            <DialogTitle className="text-red-400 text-xl sm:text-2xl">Delete Account</DialogTitle>
            <DialogDescription className="text-light-300 text-sm sm:text-base">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-light-200">
                To confirm, type <span className="font-bold">DELETE ACCOUNT</span> below:
              </p>
              <Input
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className={`bg-dark-400 border-dark-300 text-light-100 w-full  text-sm sm:text-base  p-3 `}
                placeholder="DELETE ACCOUNT"
              />
            </div>
          </div>

          <DialogFooter className={`flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end`}>
            <Button variant="outline" onClick={handleDialogClose} className={` text-light-100 bg-dark-300 border-dark-300 hover:bg-dark-400 w-full sm:w-auto py-2  `}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={confirmationText !== "DELETE ACCOUNT" || isDeleting}
              className={` bg-red-500/20 hover:bg-red-500/30 text-red-400 w-full sm:w-auto py-2 `}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
