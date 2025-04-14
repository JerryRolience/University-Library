import BookCover from "@/components/Books/BookCover";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";
import { IoReceiptOutline } from "react-icons/io5";
import { Profile } from "../Profile";
import { StatusDropdown } from "../users/StatusDropDown";
import { formatDate } from "@/lib/util";
import { BorrowRecords, DropdownOption } from "@/types";

const bookStatusOptions: DropdownOption[] = [
  {
    value: "BORROWED",
    label: "Borrowed",
    colorClass: "text-[#7c3aed] ",
    backgroundColor: "bg-[#ede9fe]",
  },
  {
    value: "RETURNED",
    label: "Returned",
    colorClass: "text-[#0284c7]  ",
    backgroundColor: "bg-[#e0f2fe]",
  },
  {
    value: "OVERDUE",
    label: "Late Return",
    colorClass: "text-[#e11d48] ",
    backgroundColor: "bg-[#ffe4e6]",
  },
];

export function BorrowBookTableRow({
  book,
  user,
  status,
  borrowDate,
  returnedDate,
  dueDate,
}: {
  book: BorrowRecords;
  user: { name: string; email: string; profilePic: string };
  status: string;
  borrowDate: Date | undefined;
  returnedDate: Date | undefined;
  dueDate: Date | undefined;
}) {
  const dates = [borrowDate, returnedDate, dueDate];

  return (
    <TableRow className="hover:bg-gray-50 border-b border-gray-200/50">
      <TableCell className="pl-2 pr-1 py-6 max-w-[200px]">
        <div className="flex items-center gap-3 max-w-[260px]">
          <div className="h-12">
            <BookCover
              variant="small"
              className="z-10"
              coverColor={book.BookCoverColor}
              coverImage={book.BookCoverUrl}
            />
          </div>
          <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis font-bold text-lg ">
            {book.BookTitle}
          </div>
        </div>
      </TableCell>
      <TableCell className="max-w-[180px]">
        <Profile user={user} />
      </TableCell>

      <TableCell className="text-sm px-1">
        <div className="flex items-center justify-start">
          <StatusDropdown currentValue={status} options={bookStatusOptions} />
        </div>
      </TableCell>

      {dates.map((date: Date | undefined, index: number) => (
        <TableCell key={index} className="text-sm">
          {formatDate(date)}
        </TableCell>
      ))}

      <TableCell className="pr-4">
        <button
          disabled={book.Status === "Returned"}
          onClick={() => console.log("Pressed")}
          className={cn(
            "flex items-center gap-2 bg-[#ede9fe] py-2 px-3 rounded-md",
            book.Status === "Returned" && "blur-sm"
          )}
        >
          <IoReceiptOutline size={24} color="#25388C" />
          <span className="font-bold text-[#25388C]">Generate</span>
        </button>
      </TableCell>
    </TableRow>
  );
}
