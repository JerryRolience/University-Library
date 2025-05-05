"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { bookTitles } from "@/constants";
import { DataBaseBooks } from "@/types";
import { fetchRequest } from "@/lib/api";
import { UserTableHeader } from "../users/TableHeader";
import { TableStateRow } from "../users/table/TableStateRow";
import { Spinner } from "@/components/home/Spiner";
import { BookTableRow } from "./BookTableRow";

export function BookTableComponent() {
  const [books, setBooks] = useState<DataBaseBooks[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const token = localStorage.getItem("token");

  const fetchBooks = useCallback(async () => {
    setLoadingBooks(true);
    setErrorBooks(null);
    try {
      const response = await fetchRequest(`${process.env.NEXT_PUBLIC_API}/book/get-books`, "GET", undefined, token);

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

  const sortedBooks = [...books].sort((a, b) => (sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  const sortByName = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <div className="w-full bg-white max-w-full mx-auto rounded-xl shadow border border-gray-200 px-6 pt-6 pb-4">
      <UserTableHeader sort="A-Z" title="All Books" sortAsc={sortAsc} sortByName={sortByName} errorUsers={errorBooks} />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="h-14 rounded-md">
            <TableRow className="bg-light-300 hover:bg-light-300">
              {bookTitles.map((title, index) => (
                <TableHead key={index} className="uppercase text-xs font-semibold text-gray-700">
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingBooks ? (
              <TableStateRow message={<Spinner />} />
            ) : errorBooks ? (
              <TableStateRow message={errorBooks} isError />
            ) : sortedBooks.length === 0 ? (
              <TableStateRow message="No Books found" />
            ) : (
              sortedBooks.map((book, index) => <BookTableRow key={index} book={book} fetchBooks={fetchBooks} />)
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
