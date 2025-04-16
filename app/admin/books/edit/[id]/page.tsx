"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui";
import BookForm from "@/components/admin/forms/BookForm";
import { DataBaseBooks } from "@/types";
import { fetchRequest } from "@/lib/api";
import { LoadingSpinner } from "@/components/home";

export default function Page() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [book, setBook] = useState<DataBaseBooks | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const uri = `${process.env.NEXT_PUBLIC_API}/book/get-book`;
      try {
        const responseData = await fetchRequest(uri, "POST", { id });

        if (responseData.ok) {
          setBook(responseData.data);
        } else {
          console.error("Failed to fetch book data");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!book) return <p>Book not found.</p>;

  return (
    <>
      <Button className="back-btn" onClick={() => router.back()}>
        <MoveLeft />
        <span className="font-bold text-lg">Go Back</span>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" book={book} />
      </section>
    </>
  );
}
