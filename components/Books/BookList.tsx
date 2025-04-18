import React from "react";
import BookCard from "./BookCard";
import { Book, BookCoverVariant, BookListProps, DataBaseBooks } from "@/types";
import { cn } from "@/lib/utils";

const BookList = ({
  title,
  books,
  containerClassName,
  variant,
}: BookListProps & { variant?: BookCoverVariant }) => {
  return (
    <section className={containerClassName}>
      <h2
        className={cn(
          "  text-light-100 ",
          title === "More similar books"
            ? "text-xl font-semibold"
            : "font-bebas-neue text-4xl"
        )}
      >
        {title}
      </h2>

      <ul className="book-list">
        {books.map((book: DataBaseBooks) => (
          <BookCard key={book.title} {...book} variant={variant} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
