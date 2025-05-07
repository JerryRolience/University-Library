import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/util";
import { StatusDropdown } from "../StatusDropDown";
import { Profile } from "../../Profile";
import { ExternalLink } from "lucide-react";
import { ActionButtons } from "../ActionButtons";
import { DropdownOption, ROLES } from "@/types";
import { useState } from "react";
import { ViewCardDialog } from "../../home/ViewCardDialog";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";

const roleOptions: DropdownOption[] = [
  {
    value: "STUDENT",
    label: "Student",
    colorClass: "text-purple-700",
    backgroundColor: "bg-purple-100",
  },
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
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
    colorClass: "text-blue-700",
    backgroundColor: "bg-blue-100",
  },
];

export function UserRow({ user, type, fetchUsers, handleUpdateUsers }: { user: any; type: "ALL USERS" | "ACCOUNT REQUEST"; fetchUsers: () => Promise<void>; handleUpdateUsers?: () => void }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [userRole, setUserRole] = useState(user.role);

  const handleStatusChange = async (newRole: ROLES) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/user/update-user-role`,
        "POST",
        {
          email: user.email,
          role: newRole,
        },
        token
      );

      if (!response.ok) {
        return toast.error("Failed to update role", {
          description: response.data.message,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }

      setUserRole(newRole);
      toast.success("Role updated successfully", {
        description: `Role updated to ${newRole}`,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update role", {
        description: "An error occurred while updating the role.",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <TableRow className="hover:bg-gray-50 border-b border-gray-200/50">
      <TableCell className="pl-4 py-4">
        <Profile user={user} />
      </TableCell>
      <TableCell className="text-sm">{formatDate(user.dateJoined)}</TableCell>
      {type === "ALL USERS" && (
        <>
          <TableCell className="min-w-[150px]">
            <div className="w-full flex justify-center">
              <StatusDropdown type="ALL_USERS" currentValue={userRole} options={roleOptions} onStatusChange={handleStatusChange} />
            </div>
          </TableCell>
          <TableCell className="text-sm">{user.booksBorrowed}</TableCell>
        </>
      )}
      <TableCell className="text-sm">{user.universityID}</TableCell>
      <TableCell>
        <button onClick={() => setOpenDialog(true)} className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
          View ID Card <ExternalLink size={14} />
        </button>

        {openDialog && <ViewCardDialog IDCard={user.universityCard} open={openDialog} onOpenChange={setOpenDialog} />}
      </TableCell>
      <TableCell className="pr-4">
        <ActionButtons type={type} user={user} fetchUsers={fetchUsers} handleUpdateUsers={handleUpdateUsers} />
      </TableCell>
    </TableRow>
  );
}
