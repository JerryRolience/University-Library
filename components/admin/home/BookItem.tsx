import BookCover from "@/components/Books/BookCover";
import { formatToDate } from "@/lib/util";
import { DataBaseBooks } from "@/types";
import { CalendarRange, Dot } from "lucide-react";

export function BookItem({ book }: { book: DataBaseBooks }) {
  return (
    <div className="w-full flex  items-center py-2 gap-3">
      <BookCover
        coverColor={book.coverColor}
        coverImage={book.coverUrl}
        variant="small"
      />

      <div className="flex flex-col gap-0">
        <h3 className="font-semibold font-ibm-plex-sans ">{book.title}</h3>

        <div className="flex text-sm text-[#64748B]">
          <p>By {book.author}</p>
          <Dot />
          <p>{book.genre}</p>
        </div>

        <div className="flex items-center gap-1 text-sm text-[#64748B]">
          <CalendarRange size={16} />
          <p>{formatToDate(book.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
