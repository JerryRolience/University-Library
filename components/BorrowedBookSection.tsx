import Image from "next/image";
import { IoReceipt } from "react-icons/io5";

export function BorrowedBookSection({ sampleBooks }: { sampleBooks: any[] }) {
  return (
    <div className="w-full xl:flex-1">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-light-100">
          Borrowed Books
        </h2>
        <button className="text-xs sm:text-sm text-light-200 hover:text-light-100 transition-colors">
          View All
        </button>
      </div>

      {sampleBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {sampleBooks.map((item) => (
            <article
              key={item.id}
              className="bg-gradient-to-b from-[#12141D] to-[#12151F] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 rounded-lg"
              aria-labelledby={`book-${item.id}-title`}
            >
              <div className="relative w-full aspect-[240/247]">
                <Image
                  src={item.cover}
                  alt={`Cover of ${item.title}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <h3
                  id={`book-${item.id}-title`}
                  className="text-base sm:text-lg font-medium text-light-100 line-clamp-2"
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-light-200">
                  {item.genre}
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
                    Borrowed on Dec 31
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/calendar.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="object-contain"
                      aria-hidden="true"
                    />
                    <p className="text-xs sm:text-sm text-light-100">
                      11 days left to return
                    </p>
                  </div>
                  <button
                    aria-label={`View receipt for ${item.title}`}
                    className="text-light-100 hover:text-light-200 transition-colors"
                  >
                    <IoReceipt size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-dark-300 rounded-lg p-6 sm:p-8 text-center">
          <p className="text-light-200 text-sm sm:text-base">
            You haven't borrowed any books yet
          </p>
          <button className="mt-3 sm:mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-light-100 transition-colors text-sm sm:text-base">
            Browse Books
          </button>
        </div>
      )}
    </div>
  );
}
