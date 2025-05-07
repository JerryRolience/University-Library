"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { bookBorrowRecordsTitles } from "@/constants";
import { BorrowRecords, STATUS } from "@/types";
import { fetchRequest } from "@/lib/api";
import { UserTableHeader } from "../users/TableHeader";
import { TableStateRow } from "../users/table/TableStateRow";
import { Spinner } from "@/components/home/Spiner";
import { BorrowBookTableRow } from "./BorrowBookTableRow";

export function BorrowBookTable() {
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecords[]>([]);
  const [status, setStatus] = useState<STATUS[]>(borrowRecords.map((u) => u.Status as STATUS));
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [errorBooksRecords, setErrorBooksRecords] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setStatus(borrowRecords.map((u) => u.Status as STATUS));
  }, [borrowRecords]);

  const fetchBorrowRecords = useCallback(async () => {
    setLoadingRecords(true);
    setErrorBooksRecords(null);
    try {
      const response = await fetchRequest(`${process.env.NEXT_PUBLIC_API}/book/get-borrow-records`, "GET", undefined, token);

      if (response.ok) {
        setBorrowRecords(response.data || []);
      } else {
        setErrorBooksRecords(response.data?.message || "Failed to load books");
      }
    } catch (error) {
      setErrorBooksRecords("An unexpected error occurred");
      console.error("Failed to fetch books:", error);
    } finally {
      setLoadingRecords(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchBorrowRecords();
    } else {
      setBorrowRecords([]);
    }
  }, [fetchBorrowRecords, token]);

  const sortedRecords = [...borrowRecords].sort((a, b) => (sortAsc ? a.BookTitle.localeCompare(b.BookTitle) : b.BookTitle.localeCompare(a.BookTitle)));

  const sortByName = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <div className="w-full bg-white max-w-full mx-auto rounded-xl shadow border border-gray-200 px-6 pt-6 pb-4">
      <UserTableHeader sort="Oldest to Recent" title="Borrow Book Requests" sortAsc={sortAsc} sortByName={sortByName} errorUsers={errorBooksRecords} />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="h-14 rounded-md">
            <TableRow className="bg-light-300 hover:bg-light-300">
              {bookBorrowRecordsTitles.map((title, index) => (
                <TableHead key={index} className="uppercase text-xs font-semibold text-gray-700">
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loadingRecords ? (
              <TableStateRow message={<Spinner />} />
            ) : errorBooksRecords ? (
              <TableStateRow message={errorBooksRecords} isError />
            ) : sortedRecords.length === 0 ? (
              <TableStateRow message="No Borrow Records found" />
            ) : (
              sortedRecords.map((book, index) => {
                const user = {
                  name: book.UserName,
                  email: book.UserEmail,
                  profilePic: book.UserProfilePic,
                  id: book.UserId,
                };
                return (
                  <BorrowBookTableRow
                    fetchRecords={fetchBorrowRecords}
                    status={status[index]}
                    key={index}
                    book={book}
                    user={user}
                    borrowDate={book.BorrowDate}
                    returnedDate={book.ReturnedDate}
                    dueDate={book.DueDate}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
