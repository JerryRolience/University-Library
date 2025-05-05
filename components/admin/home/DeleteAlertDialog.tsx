import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { fetchRequest } from "@/lib/api";
import { DeleteAlertDialogProps } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../users/Spinner";
import { Button } from "@/components/ui/button";

export function DeleteAlertDialog({ type, open, onOpenChange, book, fetchUsers, user, fetchBooks }: DeleteAlertDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const email = user?.email;

  const handleDeleteUserAccount = async () => {
    setIsDeleting(true);

    try {
      const uri = `${process.env.NEXT_PUBLIC_API}/user/delete-user`;
      const token = localStorage.getItem("token");
      if (!email) throw new Error("User email is required");

      const response = await fetchRequest(uri, "POST", { email }, token);

      if (!response.ok) throw new Error(response.data?.message || "Account deletion failed");

      toast.success("Account deleted", {
        description: `All data for ${user?.name} has been permanently removed`,

        style: { backgroundColor: "green", color: "#fff" },
      });

      if (fetchUsers) await fetchUsers();
      onOpenChange(false);
    } catch (error) {
      toast.error("Deletion failed", {
        description: error instanceof Error ? error.message : "Please try again later",
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    console.log("Deleting book with ID:", bookId);
    setIsDeleting(true);

    try {
      const uri = `${process.env.NEXT_PUBLIC_API}/book/delete-book`;
      const token = localStorage.getItem("token");
      if (!bookId) throw new Error("Book Id is required");

      const response = await fetchRequest(uri, "POST", { bookId }, token);

      if (!response.ok) throw new Error(response.data?.message || "Book deletion failed");

      toast.success("Book deleted", {
        description: "The book has been permanently removed from our servers",
        style: { backgroundColor: "green", color: "#fff" },
      });

      if (fetchBooks) await fetchBooks();
      onOpenChange(false);
    } catch (error) {
      toast.error("Deletion failed", {
        description: error instanceof Error ? error.message : "Please try again later",
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={isDeleting ? undefined : onOpenChange}>
      <AlertDialogContent className="sm:max-w-md animate-in fade-in-90 zoom-in-95">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-destructive">{type === "Delete Book" ? "Delete Book?" : "Delete User Account?"}</AlertDialogTitle>
          <div className="text-sm text-muted-foreground">
            {type === "Delete Book" ? (
              <p>
                This will permanently delete the <span className="font-bold text-primary-admin">{book.bookTitle}</span> and remove it from our servers.
              </p>
            ) : (
              <p>
                This will permanently delete <span className="font-bold text-primary-admin">{user?.name}'s</span> account and all associated data.
              </p>
            )}
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 sm:gap-4">
          <Button
            disabled={isDeleting}
            className="w-full bg-destructive hover:bg-destructive/60 text-destructive-foreground"
            onClick={() => {
              if (type === "Delete Book") {
                handleDeleteBook(book.bookId);
              } else {
                handleDeleteUserAccount();
              }
            }}
          >
            {isDeleting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Confirm Delete"
            )}
          </Button>
          <AlertDialogCancel disabled={isDeleting} className="w-full border border-input hover:bg-accent">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
