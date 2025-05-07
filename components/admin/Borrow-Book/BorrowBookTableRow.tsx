import BookCover from "@/components/Books/BookCover";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IoReceiptOutline } from "react-icons/io5";
import { Profile } from "../Profile";
import { StatusDropdown } from "../users/StatusDropDown";
import { formatDate } from "@/lib/util";
import { BorrowRecords, DropdownOption, STATUS } from "@/types";
import { fetchRequest } from "@/lib/api";
import { toast } from "sonner";
import { ReceiptPDF } from "@/components/my-profile/ReceiptPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
  borrowDate,
  returnedDate,
  dueDate,
  fetchRecords,
}: {
  book: BorrowRecords;
  user: { id: string; name: string; email: string; profilePic: string };
  status: STATUS;
  borrowDate: Date | undefined;
  returnedDate: Date | undefined;
  dueDate: Date | undefined;
  fetchRecords: () => void;
}) {
  const [bookStatus, setBookStatus] = useState<STATUS>(book.Status as STATUS);

  const dates = [borrowDate, returnedDate, dueDate];

  const handleStatusChange = async (status: "RETURNED") => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/book/return-book`,
        "POST",
        {
          borrowId: book.BorrowId,
          bookId: book.BookId,
          userId: user.id,
        },
        token
      );

      if (!response.ok) {
        return toast.error("Failed to update book borrow status", {
          description: response.data.message,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }

      setBookStatus(status);
      toast.success("Book borrow status updated successfully", {
        description: `Book borrowed status updated to ${status}`,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      fetchRecords();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update book borrow status", {
        description: "An error occurred while updating the status.",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <TableRow className="hover:bg-gray-50 border-b border-gray-200/50">
      <TableCell className="pl-2 pr-1 py-6 max-w-[200px]">
        <div className="flex items-center gap-3 max-w-[260px]">
          <div className="h-12">
            <BookCover variant="small" className="z-10" coverColor={book.BookCoverColor} coverImage={book.BookCoverUrl} />
          </div>
          <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis font-bold text-lg ">{book.BookTitle}</div>
        </div>
      </TableCell>
      <TableCell className="max-w-[180px]">
        <Profile user={user} />
      </TableCell>

      <TableCell className="text-sm px-1">
        <div className="flex items-center justify-start">
          <StatusDropdown type="BOOK_REQUEST" currentValue={bookStatus} options={bookStatusOptions} onBookStatusChange={(status: "RETURNED") => handleStatusChange(status)} />
        </div>
      </TableCell>

      {dates.map((date: Date | undefined, index: number) => (
        <TableCell key={index} className="text-sm">
          {formatDate(date)}
        </TableCell>
      ))}

      <TableCell className="pr-4">
        <PDFDownloadLink
          document={
            <ReceiptPDF
              book={{
                borrowRecord: {
                  _id: book.BookId,
                  bookId: book.BookId,
                  borrowDate: new Date(book.BorrowDate).toISOString(),
                  dueDate: new Date(book.DueDate).toISOString(),
                  status: book.Status,
                },
                bookDetail: {
                  _id: book.BookId,
                  id: book.BookId,
                  title: book.BookTitle,
                  author: book.BookAuthor,
                  genre: book.BookGenre,
                  coverUrl: book.BookCoverUrl,
                  coverColor: book.BookCoverColor,
                  rating: book.BookRating,
                  description: book.BookDescription,
                },
              }}
            />
          }
          fileName={`receipt-${book.BookTitle.replace(/\s+/g, "-")}-${book.BookId}.pdf`}
        >
          {({ loading }) => (
            <button
              disabled={book.Status === "RETURNED"}
              onClick={() => console.log("Pressed")}
              className={cn("flex items-center gap-2 bg-[#ede9fe] py-2 px-3 rounded-md", book.Status === "RETURNED" && "blur-sm")}
            >
              <IoReceiptOutline size={24} color="#25388C" />
              {loading ? <span className="font-bold text-[#25388C]">Generating...</span> : <span className="font-bold text-[#25388C]">Generate</span>}
            </button>
          )}
        </PDFDownloadLink>
      </TableCell>
    </TableRow>
  );
}
