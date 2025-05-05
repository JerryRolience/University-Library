import { fetchRequest } from "@/lib/api";
import { DataBaseBooks } from "@/types";
import { CalendarRange, MoveLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { formatToDate } from "@/lib/util";
import BookCover from "@/components/Books/BookCover";
import { hexToRgba } from "@/lib/utils";
import BookVideo from "@/components/Books/BookVideo";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const uri = `${process.env.NEXT_PUBLIC_API}/book/get-book`;

  try {
    const responseData = await fetchRequest(uri, "POST", { id }, undefined);

    if (!responseData.ok) {
      return;
    }

    const book: DataBaseBooks = responseData.data;

    return (
      <>
        <Button className="back-btn ">
          <MoveLeft />
          <Link href="/admin/books " className="text-lg">
            Go Back
          </Link>
        </Button>

        <section>
          {/*Book Profile section*/}
          <div className="flex items-start  gap-8  mb-6">
            {/*Book Image*/}
            <div className="relative w-[240px] h-[247px] rounded-sm group overflow-hidden" style={{ backgroundColor: hexToRgba(book.coverColor, 0.3) }}>
              <div className="absolute inset-0 rounded-sm transition duration-300 opacity-0 group-hover:opacity-100" style={{ backgroundColor: hexToRgba(book.coverColor, 0.4) }} />
              <div className="relative z-10 mt-[28px] ml-12 drop-shadow-2xl shadow-black">
                <BookCover coverColor={book.coverColor} coverImage={book.coverUrl} variant="medium" />
              </div>
            </div>

            {/*Book Details*/}
            <div className="flex flex-col space-y-4">
              <div className="flex  items-center ">
                <p className="mr-4 text-[#64748B] text-lg"> Created at: </p>
                <CalendarRange size={16} />
                <p className="ml-2 text-gray-700 text-lg"> {formatToDate(book.createdAt)}</p>
              </div>

              <p className="font-bold text-3xl ">{book.title}</p>
              <p className="font-semibold text-xl "> By {book.author}</p>
              <p className="text-lg text-[#64748B]">{book.genre}</p>

              <Link
                href={`/admin/books/edit/${book.id}`}
                className="flex items-center justify-center gap-2 rounded-lg w-[422px] py-4 px-6 
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
            <div className="w-[800px]">
              <h2 className="font-semibold text-xl mb-4">Summary</h2>
              <h3 className="text-[#64748B] space-y-3 text-lg ">
                {book.summary.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </h3>
            </div>

            {/*Book VideoPreview*/}
            <div className="w-[580px]">
              <h2 className="font-semibold text-xl mb-4">Book Preview</h2>
              <div className="relative w-full aspect-video ">
                <BookVideo videoUrl={book.videoUrl} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return;
  }
}
