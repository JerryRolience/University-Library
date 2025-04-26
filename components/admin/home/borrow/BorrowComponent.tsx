"use client";

import { Button } from "@/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { BorrowRecords } from "@/types";
import { BorrowBookItem } from ".";
import { fetchRequest } from "@/lib/api";
import { Spinner } from "@/components/home/Spiner";
import { LeftNoResult } from "../LeftNoResults";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function BorrowComponent() {
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecords[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const fetchBooks = useCallback(async () => {
    if (!token) return;

    setLoadingBooks(true);

    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/book/get-borrow-records`,
        "GET",
        undefined,
        token
      );

      if (response.ok) {
        setBorrowRecords(response.data || []);
      } else {
        toast.error("Failed to load borrow records", {
          description:
            response.data?.message || "Something went wrong, please try again.",
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        style: { backgroundColor: "red", color: "#fff" },
      });
      console.error("Failed to fetch books:", error);
    } finally {
      setLoadingBooks(false);
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchBooks();
    } else {
      setBorrowRecords([]);
    }
  }, [fetchBooks, token]);

  const displayedBooks = borrowRecords.slice(0, 3);

  if (borrowRecords.length === 0) {
    return <LeftNoResult type="Borrow Records" />;
  }

  return (
    <div className="flex-1 bg-white rounded-2xl shadow p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold mb-4">Borrow Records</h3>
        <Button
          onClick={() => router.push("/admin/book-requests")}
          className="text-primary-admin bg-[#F8F8FF] hover:bg-primary-admin/15"
        >
          View All
        </Button>
      </div>

      {loadingBooks && <Spinner />}

      <div className="relative">
        {displayedBooks.map((book, index) => (
          <div className={"mb-2"} key={index}>
            <BorrowBookItem book={book} />
          </div>
        ))}

        {/* Gradient overlay for the bottom */}
        {displayedBooks.length > 2 && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}
