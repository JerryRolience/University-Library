"use client";

import BookOverview from "@/components/Books/BookOverview";
import SearchBookList from "@/components/Books/search/SearchBookList";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { books, errorBooks, fetchBooks } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 8;

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (errorBooks) {
      toast.error("Error getting books", {
        description: errorBooks,
        style: { backgroundColor: "red", color: "#fff" },
      });
    }
  }, [errorBooks]);

  if (!books || books.length === 0) return null;

  // Calculate current books to display
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <BookOverview {...books[6]} />

      <SearchBookList title="Latest Books" books={currentBooks} containerClassName="mt-28 ml-5" />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button variant="ghost" onClick={handlePrevPage} disabled={currentPage === 1} className="gap-1 bg-primary/10  hover:bg-primary/20 text-primary hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <span className=" text-xs sm:text-sm font-medium text-primary">
          Page {currentPage} of {totalPages}
        </span>

        <Button variant="ghost" onClick={handleNextPage} disabled={currentPage === totalPages} className="gap-1 bg-primary/10  hover:bg-primary/20 text-primary hover:text-primary transition-colors">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
