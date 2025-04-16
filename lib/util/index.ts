import { DropdownOption } from "@/types";
import { differenceInDays, format } from "date-fns";

export function calculateDaysLeft(dueDateString: string) {
  const dueDate = new Date(dueDateString);
  const today = new Date();
  return differenceInDays(dueDate, today);
}

export const formatShortDate = (dateString: string) => {
  return format(new Date(dateString), "MMM d"); // "Apr 5"
};

export const formatLongDate = (dateString: string) => {
  return format(new Date(dateString), "MMM d, yyyy"); // "Apr 5, 2023"
};

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");
};

export function formatToDate(date: string | Date | null | undefined): string {
  if (!date) return "N/A";
  const d = new Date(date);
  const month = d.getMonth() + 1; // getMonth() returns 0-11
  const day = d.getDate();
  const year = d.getFullYear().toString().slice(-2); // Get last 2 digits
  return `${day}/${month}/${year}`;
}

export const bookStatusOptions: DropdownOption[] = [
  {
    value: "Borrowed",
    label: "Borrowed",
    colorClass: "text-[#7c3aed] ",
    backgroundColor: "bg-[#ede9fe]",
  },
  {
    value: "Returned",
    label: "Returned",
    colorClass: "text-[#0284c7]  ",
    backgroundColor: "bg-[#e0f2fe]",
  },
  {
    value: "Late Return",
    label: "Late Return",
    colorClass: "text-[#e11d48] ",
    backgroundColor: "bg-[#ffe4e6]",
  },
];
