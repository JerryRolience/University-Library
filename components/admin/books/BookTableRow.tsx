import BookCover from "@/components/Books/BookCover";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/util";
import { DataBaseBooks } from "@/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { DeleteAlertDialog } from "../home/DeleteAlertDialog";

export function BookTableRow({ book }: { book: DataBaseBooks }) {
  const [dialogType, setDialogType] = useState<"Delete Book" | null>(null);

  const handleDelete = () => setDialogType("Delete Book");

  return (
    <TableRow className="hover:bg-gray-50 border-b border-gray-200/50">
      <TableCell className="pl-4 py-6 max-w-[250px]">
        <div className="flex items-center gap-3">
          <div className="h-[34.88px] w-[25.47px]">
            <BookCover
              variant="extraSmall"
              className="z-10"
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
            />
          </div>
          <div className="min-w-0 max-w-full">
            <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis font-bold text-lg">
              {book.title}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-sm  max-w-[180px]">{book.author}</TableCell>
      <TableCell className="text-sm">{book.genre}</TableCell>
      <TableCell className="text-sm">{formatDate(book.createdAt)}</TableCell>
      <TableCell className="pr-4">
        <div className="flex items-center gap-6">
          <div>
            <CiEdit size={24} color="#0089F1" />
          </div>
          <div className="text-red-400 hover:text-red-600">
            <Trash2 size={24} onClick={handleDelete} />

            {dialogType && (
              <DeleteAlertDialog
                type={dialogType}
                open={!!dialogType}
                onOpenChange={(open) => {
                  if (!open) setDialogType(null);
                }}
              />
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
