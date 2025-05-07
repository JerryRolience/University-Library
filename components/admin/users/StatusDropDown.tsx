"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ROLES, STATUS, StatusDropdownProps } from "@/types";
import { Check } from "lucide-react";
import { useState } from "react";
import { StatusAlertDialog } from "./StatusDialog";
import { Spinner } from "./Spinner";
import { toast } from "sonner";
export function StatusDropdown({ type, currentValue, options, onStatusChange, onBookStatusChange }: StatusDropdownProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<ROLES | STATUS | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentOption = options.find((opt) => opt.value === currentValue);

  const handleRoleSelect = (role: ROLES | STATUS) => {
    if (role === "BORROWED" || role === "OVERDUE") {
      return toast.error("Cannot Update  book borrow status", {
        description: "You can only update book status to returned.",
        style: { backgroundColor: "red", color: "white" },
      });
    }

    setPendingRole(role);
    setDialogOpen(true);
    setDropdownOpen(false);
  };

  const handleConfirm = async () => {
    if (!pendingRole) return;

    setIsProcessing(true);
    try {
      if (onStatusChange && type === "ALL_USERS") {
        return await onStatusChange(pendingRole as ROLES);
      }

      if (onBookStatusChange && type === "BOOK_REQUEST" && pendingRole === "RETURNED") {
        return await onBookStatusChange(pendingRole as "RETURNED");
      }
    } finally {
      setIsProcessing(false);
      setDialogOpen(false);
      setPendingRole(null);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && !isProcessing) {
      setPendingRole(null);
    }
    setDialogOpen(open);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild disabled={isProcessing}>
          <button
            className={`px-3 py-1 rounded-full text-xs font-semibold transition hover:opacity-80 ${currentOption?.colorClass} ${currentOption?.backgroundColor} focus:outline-none ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-1">
                <Spinner className="h-3 w-3" /> Updating...
              </span>
            ) : (
              currentOption?.label
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="space-y-1">
          {options.map((option) => (
            <DropdownMenuItem onClick={() => handleRoleSelect(option.value as ROLES)} key={option.value} className="flex items-center justify-between gap-2">
              <span className={option.colorClass}>{option.label}</span>
              {currentValue === option.value && <Check size={14} className={option.colorClass} />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <StatusAlertDialog open={dialogOpen} onOpenChange={handleDialogOpenChange} onConfirm={handleConfirm} isProcessing={isProcessing} type={type} user={{ role: pendingRole! }} />
    </>
  );
}
