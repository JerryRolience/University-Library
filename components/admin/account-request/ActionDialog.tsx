import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { fetchRequest } from "@/lib/api";
import { ActionDialogProps } from "@/types";
import Image from "next/image";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { Spinner } from "../users/Spinner";

export function ActionDialog({
  type,
  open,
  onOpenChange,
  user,
  fetchUsers,
}: ActionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const dialogInfo = {
    Approve: {
      title: "Approve & Send Confirmation",
      description:
        "Approve the student's account and grant access. A confirmation email will be sent upon approval.",
      buttonClass: "bg-green hover:bg-green/70",
      image: "/images/approve.png",
      apiEndpoint: "/user/approve-user-account",
      workflow: "/api/workflows/accept-account",
    },
    Reject: {
      title: "Deny & Notify Student",
      description:
        "Denying this request will notify the student they're not eligible due to unsuccessful ID Card verification.",
      buttonClass: "bg-[#F46F70] hover:bg-[#f15556]",
      image: "/images/reject.png",
      apiEndpoint: "/user/reject-user-account",
      workflow: "/api/workflows/reject-account",
    },
  };

  const isApproval = type === "Approve Account Request";
  const config = isApproval ? dialogInfo.Approve : dialogInfo.Reject;

  const handleWorkflowTrigger = useCallback(
    async (uri: string, email: string, fullName: string) => {
      try {
        const response = await fetch(uri, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, fullName }),
        });

        if (!response.ok) throw new Error("Failed to trigger workflow");
      } catch (err) {
        console.error("Workflow trigger error:", err);
      }
    },
    []
  );

  const handleAction = useCallback(async () => {
    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}${config.apiEndpoint}`,
        "POST",
        { email: user.email },
        token || undefined
      );

      if (!response.ok) {
        toast.error(
          `Failed to ${isApproval ? "Approve" : "Reject"} User's Account`,
          {
            description: response.data.message,
            style: { backgroundColor: "red", color: "white" },
          }
        );
        return;
      }

      toast.success(
        `${isApproval ? "Approved" : "Rejected"} account successfully`,
        {
          description: response.data.message,
          style: { backgroundColor: "green", color: "white" },
        }
      );

      await fetchUsers?.();
      await handleWorkflowTrigger(config.workflow, user.email, `${user.name}`);

      onOpenChange(false); // Auto-close after success
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }, [config, handleWorkflowTrigger, isApproval, token, user, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent
        className="sm:max-w-[425px] animate-in fade-in-90 zoom-in-95"
        onInteractOutside={(e) => isLoading && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{config.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center px-4">
          <Image
            src={config.image}
            alt={config.title}
            width={110}
            height={110}
            className="object-cover rounded-full"
            aria-hidden="true"
          />

          <h2 className="font-semibold text-lg mt-4">{type}</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {config.description}
          </p>
        </div>

        <Button
          onClick={handleAction}
          disabled={isLoading}
          className={`w-full py-6 text-white text-sm mt-4 transition-all ${config.buttonClass}`}
          aria-label={config.title}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            config.title
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
