import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActionDialogProps } from "@/types";
import Image from "next/image";

export function ActionDialog({ type, open, onOpenChange }: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center px-4">
          <Image
            src={
              type === "Approve Account Request"
                ? "/images/approve.png"
                : "/images/reject.png"
            }
            alt="Approval Illustration"
            width={110}
            height={110}
            className="object-cover rounded-full"
          />

          <p className="font-semibold text-lg mt-4">{type}</p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {type === `Approve Account Request`
              ? `
           Approve the student's account and grant access. A confirmation email
           will be sent upon approval.
           `
              : `Denying this request will notify the student they're not eligible due to unsuccessful ID Card verification `}
          </p>
        </div>

        <Button
          className={`w-full ${
            type === "Approve Account Request" ? "bg-green" : "bg-[#F46F70]"
          } py-3 lg:py-6 text-white text-sm hover:opacity-90 mt-2`}
          type="submit"
        >
          {type === "Approve Account Request"
            ? "Approve & Send Confirmation"
            : "Deny & Notify Student"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
