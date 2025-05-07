import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { StatusAlertDialogProps } from "@/types";
import { Spinner } from "./Spinner";

export function StatusAlertDialog({ type, open, onOpenChange, onConfirm, isProcessing, user }: StatusAlertDialogProps & { isProcessing: boolean; type: "ALL_USERS" | "BOOK_REQUEST" }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-lg border-0 bg-white p-6 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-900">{type === "ALL_USERS" ? "Confirm Role Change" : "Confirm Book Status Change"}</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-gray-600">
            {type === "ALL_USERS" ? (
              <>
                You're about to change this user's role to <span className="font-medium text-blue-600">{user.role}</span>. This will affect their permissions immediately.
              </>
            ) : (
              <>
                You're about to change the book status to <span className="font-medium text-blue-600">{user.role}</span>. This will indicate that the book has been returned.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 flex flex-row-reverse gap-3">
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isProcessing}
            className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                Updating...
              </span>
            ) : (
              "Confirm Change"
            )}
          </AlertDialogAction>
          <AlertDialogCancel
            disabled={isProcessing}
            className={`mt-0 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
