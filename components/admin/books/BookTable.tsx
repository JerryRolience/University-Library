"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, ArrowUpDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { bookTitles } from "@/constants";
import Link from "next/link";
import { DataBaseBooks } from "@/types";
import { fetchRequest } from "@/lib/api";
import { CiEdit } from "react-icons/ci";
import BookCover from "@/components/Books/BookCover";

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

  const formartDate = (date: string | Date | undefined): string => {
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

  return (
    <div className="w-full bg-white max-w-full mx-auto rounded-xl shadow border border-gray-200 px-6 pt-6 pb-4">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold mb-4">All Books</h2>
          <div className="flex items-center justify-center gap-3 ">
            <span>A-Z</span>{" "}
            <ArrowUpDown
              size={20}
              onClick={sortByName}
              className={`${sortAsc ? "rotate-0" : "rotate-180"} hover:opacity-80 transition-transform duration-200`}
            />
            <Button className="bg-primary-admin" asChild>
              <Link href="/admin/books/new" className="text-white">
                + Create a New Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="h-14 rounded-md">
            <TableRow className="bg-light-300 hover:bg-light-300">
              {bookTitles.map((title, index) => (
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
                  colSpan={bookTitles.length}
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
                  colSpan={bookTitles.length}
                  className="text-center py-8 text-red-500"
                >
                  {errorBooks}
                </TableCell>
              </TableRow>
            ) : sortedBooks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={bookTitles.length}
                  className="text-center py-8 text-gray-500"
                >
                  No books found
                </TableCell>
              </TableRow>
            ) : (
              sortedBooks.map((book, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-200/50"
                >
                  <TableCell className="pl-4 py-6">
                    <div className="flex items-center gap-2">
                      <div className="h-[34.88px] w-[25.47px] ">
                        <BookCover
                          variant="extraSmall"
                          className="z-10"
                          coverColor={book.coverColor}
                          coverImage={book.coverUrl}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-md">{book.title}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{book.author}</TableCell>
                  <TableCell className="text-sm">{book.genre}</TableCell>
                  <TableCell className="text-sm">
                    {formartDate(book.createdAt)}
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <CiEdit size={24} color="#0089F1" />
                      </div>
                      <div className="text-red-400 hover:text-red-600">
                        <Trash2 size={24} />
                      </div>
                    </div>
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
