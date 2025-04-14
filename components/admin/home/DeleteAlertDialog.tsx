import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteAlertDialogProps } from "@/types";

export function DeleteAlertDialog({
  type,
  open,
  onOpenChange,
}: DeleteAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-red-600">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500">
            {type === "Delete Book"
              ? `  This action cannot be undone. This will permanently delete the book
            and remove it from the servers.`
              : `  This action cannot be undone. This will permanently delete the User
            and remove all their data from the servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-4">
          <AlertDialogCancel className="w-full border border-gray-300 hover:bg-gray-100">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="w-full bg-[#F46F70] hover:bg-[#f15556] text-white">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
