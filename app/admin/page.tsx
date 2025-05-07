"use client";

import { AccountRequestComponent } from "@/components/admin/home/account/AccountRequestComponent";
import { BookItem } from "@/components/admin/home/BookItem";
import { BorrowComponent } from "@/components/admin/home/borrow/BorrowComponent";
import { StatCard } from "@/components/admin/home/StatCard";
import { Spinner } from "@/components/home/Spiner";
import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { fetchRequest } from "@/lib/api";
import { DataBaseBooks } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardPage = () => {
  const { books, fetchBooks, loadingBooks } = useAuth();
  const [analytics, setAnalytics] = useState<{
    borrowedBooksCount: number;
    totalUsersCount: number;
    totalBooksCount: number;
    deltas?: {
      borrowedDelta: number;
      usersDelta: number;
      booksDelta: number;
    };
  }>({
    borrowedBooksCount: 0,
    totalUsersCount: 0,
    totalBooksCount: 0,
    deltas: {
      borrowedDelta: 0,
      usersDelta: 0,
      booksDelta: 0,
    },
  });
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    if (!token) return;

    setLoadingAnalytics(true);

    try {
      const response = await fetchRequest(`${process.env.NEXT_PUBLIC_API}/user/get-admin-analytics`, "GET", undefined, token);

      if (response.ok) {
        setAnalytics({
          borrowedBooksCount: response.data.borrowedBooksCount,
          totalUsersCount: response.data.totalUsersCount,
          totalBooksCount: response.data.totalBooksCount,
          deltas: {
            borrowedDelta: response.data.deltas?.borrowedDelta || 0,
            usersDelta: response.data.deltas?.usersDelta || 0,
            booksDelta: response.data.deltas?.booksDelta || 0,
          },
        });
      } else {
        toast.error(response.data?.message || "Failed to load analytics", {
          description: "Something went wrong, please try again.",
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setLoadingAnalytics(false);
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchAnalytics();
      fetchBooks();
    } else {
      setAnalytics({
        borrowedBooksCount: 0,
        totalUsersCount: 0,
        totalBooksCount: 0,
        deltas: {
          borrowedDelta: 0,
          usersDelta: 0,
          booksDelta: 0,
        },
      });
    }
  }, [fetchAnalytics, token]);

  return (
    <div>
      {/* Stats Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-5 -mt-4">
        <StatCard label="Borrowed Books" value={analytics.borrowedBooksCount} delta={analytics.deltas?.borrowedDelta || 0} loading={loadingAnalytics} />
        <StatCard label="Total Users" value={analytics.totalUsersCount} delta={analytics.deltas?.usersDelta || 0} loading={loadingAnalytics} />
        <StatCard label="Total Books" value={analytics.totalBooksCount} delta={analytics.deltas?.booksDelta || 0} loading={loadingAnalytics} />
      </section>

      {/* Main Content Section */}
      <section className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          <div className="flex flex-col gap-8 justify-center min-h-[760px]">
            <BorrowComponent />
            <AccountRequestComponent />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 w-full bg-white rounded-2xl shadow p-6 min-h-[760px] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">Recently Added Books</h3>
            <Link href="/admin/books">
              <Button className="text-primary-admin bg-[#F8F8FF] hover:bg-primary-admin/15">View All</Button>
            </Link>
          </div>

          <div className="w-full bg-light-300 py-5 flex items-center gap-4 pl-5">
            <Link href={"/admin/books/new"}>
              <Plus className="bg-white w-10 h-10 text-gray-100 rounded-full" />
            </Link>
            <h3 className="text-lg font-medium">Add New Book</h3>
          </div>

          {loadingBooks ? <Spinner /> : books && books.length > 0 ? books.slice(0, 7).map((book) => <BookItem key={book.id} book={book} />) : <div className="text-center py-4">No books found</div>}

          <div className="absolute -bottom-32 left-0 right-0 h-44 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
