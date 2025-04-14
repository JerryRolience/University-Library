"use client";

import { LeftNoResult } from "@/components/admin/home/LeftNoResults";
import { StatCard } from "@/components/admin/home/StatCard";
import BookCover from "@/components/Books/BookCover";
import { Spinner } from "@/components/home/Spiner";
import { Button } from "@/components/ui";
import { fetchRequest } from "@/lib/api";
import { formatDate } from "@/lib/util";
import { DataBaseBooks } from "@/types";
import { Plus, CalendarRange, Dot } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const DashboardPage = () => {
  const [books, setBooks] = useState<DataBaseBooks[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const fetchBooks = useCallback(async () => {
    setLoadingBooks(true);
    setErrorBooks(null);
    try {
      const response = await fetchRequest(
        `${process.env.NEXT_PUBLIC_API}/book/get-books`,
        "GET",
        undefined,
        token
      );

      if (response.ok) {
        setBooks(response.data || []);
      } else {
        setErrorBooks(response.data?.message || "Failed to load books");
      }
    } catch (error) {
      setErrorBooks("An unexpected error occurred");
      console.error("Failed to fetch books:", error);
    } finally {
      setLoadingBooks(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [fetchBooks, token]);
  return (
    <div>
      {/* Stats Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-5 -mt-4">
        <StatCard label="Borrowed Books" value={145} delta={-2} />
        <StatCard label="Total Users" value={317} delta={+4} />
        <StatCard label="Total Books" value={163} delta={+2} />
      </section>

      {/* Main Content Section */}
      <section className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className=" flex-1 space-y-8 ">
          <div className="flex flex-col gap-8 justify-center min-h-[760px]">
            <LeftNoResult type="Borrow Records" />
            <LeftNoResult type="Account Records" />
          </div>
        </div>

        {/* Right Column */}
        <div className=" flex-1 w-full bg-white rounded-2xl shadow p-6 min-h-[760px] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">Recently Added Books</h3>
            <Button className="text-primary-admin bg-[#F8F8FF] hover:bg-primary-admin/15">
              View All
            </Button>
          </div>
          {/* Content would go here */}
          <div className="w-full bg-light-300  py-5  flex items-center gap-4 pl-5">
            <Link href={"/admin/books/new"}>
              <Plus className="bg-white w-10 h-10  text-gray-100  rounded-full" />
            </Link>
            <h3 className="text-lg font-medium">Add New Book</h3>
          </div>

          {loadingBooks && <Spinner />}

          {books.slice(0, 6).map((book, index) => {
            return (
              <div key={index} className="w-full flex  items-center py-2 gap-3">
                <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  variant="small"
                />

                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold font-ibm-plex-sans ">
                    {book.title}
                  </h3>

                  <div className="flex text-sm text-[#64748B]  ">
                    <p>By {book.author}</p>
                    <Dot />
                    <p> {book.genre}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CalendarRange size={16} />
                    <p>{formatDate(book.createdAt)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
