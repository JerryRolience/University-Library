// app/book/[id]/page.tsx
import { fetchRequest } from "@/lib/api";
import { DataBaseBooks } from "@/types";
import BookDetails from "@/components/Books/BookDetailsPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const uri = `${process.env.NEXT_PUBLIC_API}/book/get-book`;

  try {
    const responseData = await fetchRequest(uri, "POST", { id }, undefined);

    if (!responseData.ok) {
      return <BookDetails book={null} initialBooks={responseData.data} />;
    }

    const book: DataBaseBooks = responseData.data;
    return <BookDetails book={book} initialBooks={responseData.data} />;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return <BookDetails book={null} />;
  }
}
