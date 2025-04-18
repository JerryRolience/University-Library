import React from "react";
import BookCard from "../BookCard";
import { Book, BookCoverVariant, BookListProps, DataBaseBooks } from "@/types";
import { cn } from "@/lib/utils";

const SearchBookList = ({
  title,
  books,
  containerClassName,
  variant,
}: BookListProps & { variant?: BookCoverVariant }) => {
  return (
    <section className={containerClassName}>
      {title && (
        <h2
          className={cn(
            "text-light-100",
            title === "More similar books"
              ? "text-xl font-semibold"
              : "font-bebas-neue text-4xl"
          )}
        >
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 ">
        {books.map((book: DataBaseBooks) => (
          <BookCard key={book.title} {...book} variant={variant} />
        ))}
      </div>
    </section>
  );
};

export default SearchBookList;
