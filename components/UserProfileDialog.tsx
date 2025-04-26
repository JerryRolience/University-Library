import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfileForm from "./home/EditIDDetails";
import { editIDDetailsSchema } from "@/lib/validations";
import { User } from "@/types";
import { Button } from "./ui/button";

export function UserProfileDialog({
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
      <DialogContent className="w-[90vw] max-w-md bg-gradient-to-b from-[#12141D] to-[#12151F] border border-dark-100 hover:border-primary/30 transition-colors flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-primary text-center mb-3">
            Edit your ID details
          </DialogTitle>
          <DialogDescription className="text-light-300">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm
          schema={editIDDetailsSchema}
          defaultValues={{
            universityId: user?.universityID || "",
            universityCard: user?.universityCard || "",
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
