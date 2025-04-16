"use client";

import { AccountRequestComponent } from "@/components/admin/home/account/AccountRequestComponent";
import { BookItem } from "@/components/admin/home/BookItem";
import { BorrowComponent } from "@/components/admin/home/borrow/BorrowComponent";
import { StatCard } from "@/components/admin/home/StatCard";
import { Spinner } from "@/components/home/Spiner";
import { Button } from "@/components/ui";
import { fetchRequest } from "@/lib/api";
import { DataBaseBooks } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardPage = () => {
  const [books, setBooks] = useState<DataBaseBooks[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    if (!token) return;

    setLoadingBooks(true);

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
        toast.error(response.data?.message || "Failed to load books", {
          description: "Something went wrong, please try again.",
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
            <BorrowComponent />
            <AccountRequestComponent />
          </div>
        </div>

        {/* Right Column */}
        <div className=" flex-1 w-full bg-white rounded-2xl shadow p-6 min-h-[760px] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">Recently Added Books</h3>
            <Link href="/admin/books">
              <Button className="text-primary-admin bg-[#F8F8FF] hover:bg-primary-admin/15">
                View All
              </Button>
            </Link>
          </div>

          <div className="w-full bg-light-300  py-5  flex items-center gap-4 pl-5">
            <Link href={"/admin/books/new"}>
              <Plus className="bg-white w-10 h-10  text-gray-100  rounded-full" />
            </Link>
            <h3 className="text-lg font-medium">Add New Book</h3>
          </div>

          {loadingBooks && <Spinner />}

          {books.slice(0, 7).map((book, index) => (
            <BookItem key={index} book={book} />
          ))}

          <div className="absolute -bottom-32 left-0 right-0 h-44 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
