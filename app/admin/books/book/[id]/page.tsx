"use client";

import { use } from "react";
import { fetchRequest } from "@/lib/api";
import { DataBaseBooks } from "@/types";
import { CalendarRange, MoveLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { formatToDate } from "@/lib/util";
import BookCover from "@/components/Books/BookCover";
import { hexToRgba } from "@/lib/utils";
import BookVideo from "@/components/Books/BookVideo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise
  const { id } = use(params);
  const [book, setBook] = useState<DataBaseBooks | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const uri = `${process.env.NEXT_PUBLIC_API}/book/get-book`;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetchRequest(uri, "POST", { id }, undefined);

        if (response.ok) {
          setBook(response.data);
        }
      } catch (error) {
        console.error("Book not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, uri]);

  if (loading) {
    return <div className="text-center py-8">Loading book details...</div>;
  }

  if (!book) {
    return <div className="text-center py-8">Book not found</div>;
  }

  return (
    <>
      <Button onClick={() => router.back()} className="back-btn flex items-center gap-2 text-lg font-extrabold">
        <MoveLeft />
        Go Back
      </Button>

      <section>
        {/* Book Profile section */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-6">
          {/* Book Image */}
          <div className="relative w-[240px] h-[247px] rounded-sm group overflow-hidden" style={{ backgroundColor: hexToRgba(book.coverColor, 0.3) }}>
            <div className="absolute inset-0 rounded-sm transition duration-300 opacity-0 group-hover:opacity-100" style={{ backgroundColor: hexToRgba(book.coverColor, 0.4) }} />
            <div className="relative z-10 mt-[28px] ml-12 drop-shadow-2xl shadow-black">
              <BookCover coverColor={book.coverColor} coverImage={book.coverUrl} variant="medium" />
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <p className="mr-4 text-[#64748B] text-lg">Created at:</p>
              <CalendarRange size={16} />
              <p className="ml-2 text-gray-700 text-lg">{formatToDate(book.createdAt)}</p>
            </div>

            <p className="font-bold text-3xl">{book.title}</p>
            <p className="font-semibold text-xl">By {book.author}</p>
            <p className="text-lg text-[#64748B]">{book.genre}</p>

            <Link
              href={`/admin/books/edit/${book.id}`}
              className="flex items-center justify-center gap-2 rounded-lg w-full md:w-[422px] py-4 px-6 
              text-white text-lg font-semibold bg-primary-admin 
              hover:bg-primary-admin/80 transition-colors duration-300"
            >
              <Pencil className="w-5 h-5" />
              <span>Edit Book</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Book summary */}
          <div className="w-full lg:w-[800px]">
            <h2 className="font-semibold text-xl mb-4">Summary</h2>
            <div className="text-[#64748B] space-y-3 text-lg">
              {book.summary.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {/* Book VideoPreview */}
          <div className="w-full lg:w-[580px]">
            <h2 className="font-semibold text-xl mb-4">Book Preview</h2>
            <div className="relative w-full aspect-video">
              <BookVideo videoUrl={book.videoUrl} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
