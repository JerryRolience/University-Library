// app/components/BookDetails.tsx
"use client";

import BookList from "@/components/Books/BookList";
import BookOverview from "@/components/Books/BookOverview";
import { useAuth } from "@/contexts/AuthContext";
import { DataBaseBooks } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import BookVideo from "./BookVideo";

export default function BookDetails({
  book,
  initialBooks = [],
}: {
  book: DataBaseBooks | null;
  initialBooks?: DataBaseBooks[];
}) {
  const { books } = useAuth();

  // Ensure we always have an array
  const availableBooks = Array.isArray(books) ? books : initialBooks;

  // Safe array operations
  const recommendedBooks = availableBooks.slice(0, 6);
  console.log("Recommended Books:", recommendedBooks);
  const similarBooks = availableBooks
    .filter((b) => b.id !== book?.id)
    .splice(0, 9);

  if (!book) {
    return (
      <main className="container mx-auto px-4 py-8 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="max-w-md text-center bg-dark-500 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-light-300 mb-4">
            Book Not Found
          </h1>
          <p className="text-light-200 mb-6">
            The book you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:opacity-70 text-dark-100 font-semibold rounded-lg transition-colors"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>

        <div className="w-full mt-12">
          <BookList
            title="You might also like"
            books={recommendedBooks}
            containerClassName="mt-8"
            variant="medium"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <BookOverview {...book} />

      <div className="flex flex-col lg:flex-row items-start justify-center mt-10 gap-8 lg:gap-12">
        <div className="flex-1 w-full">
          <div className="flex flex-col gap-7">
            <div>
              <h2 className="text-primary font-semibold text-xl mb-4">
                Book Preview
              </h2>
              <div className="relative w-full aspect-video max-w-2xl">
                <BookVideo videoUrl={book.videoUrl} />
              </div>
            </div>
            <div>
              <h2 className="text-light-300 font-semibold text-xl mb-4">
                Summary
              </h2>
              <h3 className="text-light-100 space-y-5 text-xl ">
                {book.summary.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <BookList
            title="More similar books"
            books={similarBooks}
            containerClassName="mt-5 lg:mt-0"
            variant="medium"
          />
        </div>
      </div>
    </main>
  );
}
