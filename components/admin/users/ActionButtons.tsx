import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleX, Trash2 } from "lucide-react";
import { ActionDialog } from "../account-request/ActionDialog";
import { DeleteAlertDialog } from "../home/DeleteAlertDialog";

interface Prop {
  type: "ALL USERS" | "ACCOUNT REQUEST";
  user: any;
  fetchUsers?: () => Promise<void>;
}

export function ActionButtons({ type, user, fetchUsers }: Prop) {
  const allUsers = type === "ALL USERS";
  const [alertType, setAlertType] = useState<"Delete User" | null>(null);

  const [dialogType, setDialogType] = useState<
    "Approve Account Request" | "Deny Account Request" | null
  >(null);

  return (
    <>
      {allUsers ? (
        <button className="text-red-500 hover:text-red-700">
          <Trash2 onClick={() => setAlertType("Delete User")} size={20} />
        </button>
      ) : (
        <div className="flex items-center gap-6">
          <Button
            onClick={() => setDialogType("Approve Account Request")}
            className="bg-[#a7dabc] hover:bg-green-200"
          >
            Approve Account
          </Button>
          <button
            onClick={() => setDialogType("Deny Account Request")}
            className="text-red-400 hover:text-red-600"
          >
            <CircleX size={24} />
          </button>
        </div>
      )}

      {dialogType && (
        <ActionDialog
          type={dialogType}
          // converting a string to boolean(true) and null(false)
          open={!!dialogType}
          onOpenChange={(open) => {
            if (!open) setDialogType(null);
          }}
          user={user}
          fetchUsers={fetchUsers}
        />
      )}

      {alertType && (
        <DeleteAlertDialog
          type="Delete User"
          bookId="123"
          open={!!alertType}
          onOpenChange={(open) => {
            if (!open) setAlertType(null);
          }}
        />
      )}
    </>
  );
}
