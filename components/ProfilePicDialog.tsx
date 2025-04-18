import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editProfileSchema } from "@/lib/validations";
import { User } from "@/types";
import { Button } from "./ui/button";
import EditProfilePicForm from "./home/EditProfile";

export function ProfilePicDialog({
  isOpen,
  onOpenChange,
  user,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw]  max-w-md bg-gradient-to-b from-[#12141D] to-[#12151F]  border border-dark-100 hover:border-primary/30 transition-colors ">
        <DialogHeader>
          <DialogTitle className="text-primary">Edit profile</DialogTitle>
          <DialogDescription className="text-light-300">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditProfilePicForm
          schema={editProfileSchema}
          defaultValues={{
            fullName: user?.name || "",
            email: user?.email || "",
            profilePic: user?.profilePic || "",
          }}
          onSubmit={(success: boolean) => {
            if (success) {
              onOpenChange(false);
            }
          }}
        />
        <DialogFooter>
          <Button
            className="form-btn w-full"
            onClick={() => onOpenChange(false)}
          >
            cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
