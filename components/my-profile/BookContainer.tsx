import { calculateDaysLeft, formatShortDate, getStatusColor } from "@/lib/util";
import { BorrowedBook } from "@/types";
import Image from "next/image";
import { IoReceipt } from "react-icons/io5";
import BookCover from "../Books/BookCover";

export default function BookContainer({ item }: { item: BorrowedBook }) {
  const daysLeft = calculateDaysLeft(item.borrowRecord.dueDate);
  const isOverdue = daysLeft < 0;
  const status = isOverdue ? "OVERDUE" : item.borrowRecord.status;
  const color = item.bookDetail.coverColor;

  return (
    <article
      key={item.borrowRecord._id}
      className="bg-gradient-to-b from-[#12141D] to-[#12151F] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 rounded-lg border border-dark-300 hover:border-primary/30 transition-colors"
      aria-labelledby={`book-${item.bookDetail.id}-title`}
    >
      <div className="flex justify-between items-start">
        <span
          className={`${getStatusColor(status)} text-xs px-2 py-1 rounded-md`}
        >
          {status}
        </span>
        <span className="text-xs text-light-200">
          {item.bookDetail.rating}/5 ★
        </span>
      </div>

      <div
        className="relative mx-auto w-[240px] h-[247px] rounded-sm"
        style={{ backgroundColor: color }}
      >
        <div className="mt-[28px] ml-12  drop-shadow-2xl shadow-black">
          <BookCover
            coverColor={item.bookDetail.coverColor}
            coverImage={item.bookDetail.coverUrl}
            variant="medium"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:gap-2">
        <h3
          id={`book-${item.bookDetail.id}-title`}
          className="text-base sm:text-lg font-medium text-light-100 truncate"
        >
          {item.bookDetail.title}
        </h3>
        <p className="text-xs sm:text-sm text-light-200">
          {item.bookDetail.genre}
        </p>
      </div>

      <div className="mt-auto w-full space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/book.svg"
            alt=""
            width={16}
            height={16}
            className="object-contain bg-green-400"
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm text-light-100">
            Borrowed on {formatShortDate(item.borrowRecord.borrowDate)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          {status !== "RETURNED" ? (
            <div className="flex items-center gap-2">
              <Image
                src={isOverdue ? "/images/warning.png" : "/icons/calendar.svg"}
                alt=""
                width={16}
                height={16}
                className="object-contain"
                aria-hidden="true"
              />
              <p
                className={`text-xs sm:text-sm ${isOverdue ? "text-red-400" : "text-light-100"}`}
              >
                {isOverdue
                  ? `${Math.abs(daysLeft)} days overdue`
                  : `${daysLeft} days left to return`}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/images/tick-circle.png"
                alt="Returned"
                width={16}
                height={16}
                className="object-contain"
                aria-hidden="true"
              />
              <p className="text-xs sm:text-sm text-green-400">
                Returned on {formatShortDate(item.borrowRecord.dueDate)}
              </p>
            </div>
          )}
          <button
            aria-label={`View receipt for ${item.bookDetail.title}`}
            className="text-light-100 hover:text-primary transition-colors"
          >
            <IoReceipt size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
