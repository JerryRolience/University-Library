// app/page.tsx
"use client";

import BookList from "@/components/Books/BookList";
import BookOverview from "@/components/Books/BookOverview";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const { books, loadingBooks, errorBooks, fetchBooks } = useAuth();

  useEffect(() => {
    fetchBooks(); // Ensure books are fetched on component mount
  }, [fetchBooks]);

  useEffect(() => {
    if (errorBooks) {
      toast.error("Error getting books", {
        description: errorBooks,
        style: { backgroundColor: "red", color: "#fff" },
      });
    }
  }, [errorBooks]);

  if (loadingBooks || !books) {
  }

  if (!books || books.length === 0) return;

  return (
    <>
      <BookOverview {...books[6]} /> {/* Changed from books[1] to books[0] */}
      <BookList
        title="Latest Books"
        books={books.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
