"use client";

import BookCover from "@/components/Books/BookCover";
import { formatToDate } from "@/lib/util";
import { BorrowRecords } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { IKImage } from "imagekitio-next";
import { Dot, CalendarRange, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import config from "@/lib/config";

export function BorrowBookItem({ book }: { book: BorrowRecords }) {
  const router = useRouter();

  return (
    <div className="w-full bg-light-300 pl-4 flex items-center py-2 gap-5 relative">
      <BookCover
        coverColor={book.BookCoverColor}
        coverImage={book.BookCoverUrl}
        variant="borrow"
      />

      <div className="flex flex-col gap-0">
        <h3 className="font-semibold text-lg font-ibm-plex-sans ">
          {book.BookTitle}
        </h3>

        <div className="flex text-sm text-[#64748B]">
          <p>By {book.BookAuthor}</p>
          <Dot />
          <p>{book.BookGenre}</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#64748B] mt-1">
          <div className="flex items-center gap-1">
            <div className="w-[18px] h-[18px] rounded-full overflow-hidden relative flex-shrink-0">
              {book?.UserProfilePic ? (
                <IKImage
                  path={book?.UserProfilePic}
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  alt={`Profile picture of ${book.UserName}`}
                  width={18}
                  height={18}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              ) : (
                <Avatar className="w-full h-full">
                  <AvatarFallback className="bg-blue-400 text-gray-800 font-medium text-xs flex items-center justify-center w-full h-full">
                    {book?.UserName
                      ? book?.UserName.split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")
                      : "UN"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <p>{book.UserName}</p>
          </div>

          <div className="flex items-center gap-1">
            <CalendarRange size={16} />
            <p>{formatToDate(book.BorrowDate)}</p>
          </div>
        </div>
      </div>

      {/* Eye Icon Positioned Top Right */}
      <Eye
        onClick={() => router.push(`/admin/books/book/${book.BookId}`)}
        className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-primary-admin"
      />
    </div>
  );
}
