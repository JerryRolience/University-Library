import { TableCell, TableRow } from "@/components/ui/table";
import { bookBorrowRecordsTitles } from "@/constants";

export function TableStateRow({
  message,
  isError = false,
}: {
  message: React.ReactNode;
  isError?: boolean;
}) {
  return (
    <TableRow>
      <TableCell
        colSpan={bookBorrowRecordsTitles.length}
        className={`text-center py-8 ${
          isError ? "text-red-500" : "text-gray-500"
        }`}
      >
        {message}
      </TableCell>
    </TableRow>
  );
}
