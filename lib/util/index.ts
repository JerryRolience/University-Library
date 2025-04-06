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

export const getStatusColor = (status: string) => {
  switch (status) {
    case "BORROWED":
      return "bg-blue-500";
    case "OVERDUE":
      return "bg-red-800";
    case "RETURNED":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};
