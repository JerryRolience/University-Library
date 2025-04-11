"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { bookBorrowRecordsTitles, borrowRecords } from "@/constants";
import { DataBaseBooks } from "@/types";
import { fetchRequest } from "@/lib/api";
import BookCover from "@/components/Books/BookCover";
import Image from "next/image";
import { StatusDropdown } from "../users/StatusDropDown";
import { IoReceiptOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { bookStatusOptions, formatDate } from "@/lib/util";

export function BorrowBookTable() {
  const [books, setBooks] = useState<DataBaseBooks[]>([]);
  const [status, setStatus] = useState(borrowRecords.map((u) => u.Status));
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const token = localStorage.getItem("token");

  const updateStatus = (index: number, newStatus: string) => {
    const updatedStatus = [...status];
    updatedStatus[index] = newStatus;
    setStatus(updatedStatus);
  };

  const fetchBooks = useCallback(async () => {
    setLoadingBooks(true);
    setErrorBooks(null);
    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/book/get-books`,
        "GET",
        undefined,
        token
      );

      if (response.ok) {
        setBooks(response.data || []);
      } else {
        setErrorBooks(response.data?.message || "Failed to load books");
      }
    } catch (error) {
      setErrorBooks("An unexpected error occurred");
      console.error("Failed to fetch books:", error);
    } finally {
      setLoadingBooks(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [fetchBooks, token]);

  const sortedBooks = [...books].sort((a, b) =>
    sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  const sortByName = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <div className="w-full bg-white max-w-full mx-auto rounded-xl shadow border border-gray-200 px-6 pt-6 pb-4">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold mb-4">Borrow Book Requests</h2>
          <div className="flex items-center justify-center gap-4 ">
            <span>Oldest to Recent</span>{" "}
            <ArrowUpDown
              size={20}
              onClick={sortByName}
              className={`${sortAsc ? "rotate-0" : "rotate-180"} hover:opacity-80 transition-transform duration-200`}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="h-14 rounded-md">
            <TableRow className="bg-light-300 hover:bg-light-300">
              {bookBorrowRecordsTitles.map((title, index) => (
                <TableHead
                  key={index}
                  className="uppercase text-xs font-semibold text-gray-700"
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingBooks ? (
              <TableRow>
                <TableCell
                  colSpan={bookBorrowRecordsTitles.length}
                  className="text-center py-8"
                >
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-admin"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : errorBooks ? (
              <TableRow>
                <TableCell
                  colSpan={bookBorrowRecordsTitles.length}
                  className="text-center py-8 text-red-500"
                >
                  {errorBooks}
                </TableCell>
              </TableRow>
            ) : sortedBooks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={bookBorrowRecordsTitles.length}
                  className="text-center py-8 text-gray-500"
                >
                  No books found
                </TableCell>
              </TableRow>
            ) : (
              borrowRecords.map((book, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-200/50"
                >
                  <TableCell className="pl-2 pr-1 py-6 max-w-[200px]">
                    <div className="flex items-center gap-3 max-w-[260px]">
                      <div className="h-12">
                        <BookCover
                          variant="small"
                          className="z-10"
                          coverColor={"#3a2931"}
                          coverImage={
                            "/books/covers/HTML_and_CSS__Design_and_Build_Websites-cover.png"
                          }
                        />
                      </div>
                      <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis font-bold text-lg ">
                        {book.BookTitle}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm px-1">
                    {
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                          <Image
                            src="/images/test-user.jpg"
                            alt="User"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {book.UserName}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {book.UserEmail}
                          </div>
                        </div>
                      </div>
                    }
                  </TableCell>

                  <TableCell className="text-sm px-1">
                    <div className="flex items-center justify-start">
                      <StatusDropdown
                        currentValue={status[index]}
                        options={bookStatusOptions}
                        onSelect={(status) => updateStatus(index, status)}
                      />
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    {formatDate(book.BorrowDate)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(book.ReturnedDate)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(book.DueDate)}
                  </TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
