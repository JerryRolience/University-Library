import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/util";
import { StatusDropdown } from "../StatusDropDown";
import { Profile } from "../../Profile";
import { ExternalLink } from "lucide-react";
import { ActionButtons } from "../ActionButtons";
import { DropdownOption } from "@/types";
import { useState } from "react";
import { ViewCardDialog } from "../../home/ViewCardDialog";

const roleOptions: DropdownOption[] = [
  {
    value: "USER",
    label: "User",
    colorClass: "text-pink-700",
    backgroundColor: "bg-pink-100",
  },
  {
    value: "ADMIN",
    label: "Admin",
    colorClass: "text-green-700",
    backgroundColor: "bg-green-100",
  },
];

export function UserRow({
  user,
  type,
}: {
  user: any;
  type: "ALL USERS" | "ACCOUNT REQUEST";
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <TableRow className="hover:bg-gray-50 border-b border-gray-200/50">
      <TableCell className="pl-4 py-4">
        <Profile user={user} />
      </TableCell>
      <TableCell className="text-sm">{formatDate(user.dateJoined)}</TableCell>
      {type === "ALL USERS" && (
        <>
          <TableCell>
            <StatusDropdown currentValue={user.role} options={roleOptions} />
          </TableCell>
          <TableCell className="text-sm">{user.booksBorrowed}</TableCell>
        </>
      )}
      <TableCell className="text-sm">{user.universityID}</TableCell>
      <TableCell>
        <button
          onClick={() => setOpenDialog(true)}
          className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
        >
          View ID Card <ExternalLink size={14} />
        </button>

        {openDialog && (
          <ViewCardDialog
            IDCard={user.universityCard}
            open={openDialog}
            onOpenChange={setOpenDialog}
          />
        )}
      </TableCell>
      <TableCell className="pr-4">
        <ActionButtons type={type} />
      </TableCell>
    </TableRow>
  );
}
