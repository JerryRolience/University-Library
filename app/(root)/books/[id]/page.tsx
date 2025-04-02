import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const bookIndex = parseInt(id) - 1;
  const book = sampleBooks[bookIndex];

  if (!book) {
    return (
      <main className="container mx-auto px-4 py-8 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="max-w-md text-center bg-dark-500 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-light-300 mb-4">
            Book Not Found
          </h1>
          <p className="text-light-200 mb-6">
            The book you're looking for doesn't exist or may have been removed.
            Here are some other books you might enjoy instead.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3  bg-primary hover:opacity-70 text-dark-100 font-semibold rounded-lg transition-colors"
          >
            <FaArrowLeft />
            Back to All Home
          </Link>
        </div>

        {/* Show other books as recommendations */}
        <div className="w-full mt-12">
          <BookList
            title="You might also like"
            books={sampleBooks.slice(0, 6)} // Show first 6 books as samples
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

      {/* Container for side-by-side layout */}
      <div className="flex flex-col lg:flex-row items-start justify-center mt-10 gap-8 lg:gap-12">
        {/* Book Preview Section */}
        <div className="flex-1 w-full">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-light-300 font-semibold text-xl mb-4">
                Book Preview
              </h2>
              <div className="relative w-full aspect-video max-w-2xl">
                <Image
                  src={book.cover}
                  alt={`${book.title} book cover`}
                  fill
                  priority
                  className="rounded-sm object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-light-300 font-semibold text-xl mb-4">
                Summary
              </h2>
              <p className="text-light-100">{book.summary}</p>
            </div>
          </div>
        </div>

        {/* More Books Section */}
        <div className="flex-1 w-full">
          <BookList
            title="More similar books"
            books={sampleBooks.filter((_, idx) => idx !== bookIndex)}
            containerClassName="mt-5 lg:mt-0"
            variant="medium"
          />
        </div>
      </div>
    </main>
  );
};

export default page;
