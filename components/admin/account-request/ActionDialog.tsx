import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ActionDialogProps } from "@/types";
import Image from "next/image";

export function ActionDialog({ type, open, onOpenChange }: ActionDialogProps) {
  const handleWorkflowTrigger = async (email: string, fullName: string) => {
    try {
      const response = await fetch("/api/workflows/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger workflow");
      }
    } catch (err) {
      console.error("Workflow trigger error:", err);
    } finally {
    }
  };

  const dialogDescription =
    type === "Approve Account Request"
      ? "Approve the student's account and grant access. A confirmation email will be sent upon approval."
      : "Denying this request will notify the student they're not eligible due to unsuccessful ID Card verification";

  const handleApprove = () => {
    // Logic to approve the account request
    console.log("Account approved");
  };

  const handleReject = () => {
    // Logic to reject the account request
    console.log("Account rejected");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="sr-only">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center px-4">
          <Image
            src={
              type === "Approve Account Request"
                ? "/images/approve.png"
                : "/images/reject.png"
            }
            alt={
              type === "Approve Account Request"
                ? "Approval Illustration"
                : "Rejection Illustration"
            }
            width={110}
            height={110}
            className="object-cover rounded-full"
            aria-hidden="true"
          />

          <h2 className="font-semibold text-lg mt-4">{type}</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {dialogDescription}
          </p>
        </div>

        <Button
          onClick={
            type === "Approve Account Request" ? handleApprove : handleReject
          }
          className={`w-full ${
            type === "Approve Account Request"
              ? "bg-green hover:bg-green/70"
              : "bg-[#F46F70] hover:bg-[#f15556]"
          } py-3 lg:py-6 text-white text-sm hover:opacity-90 mt-2`}
          aria-label={
            type === "Approve Account Request"
              ? "Approve account and send confirmation"
              : "Deny account and notify student"
          }
        >
          {type === "Approve Account Request"
            ? "Approve & Send Confirmation"
            : "Deny & Notify Student"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
