import { useState, useEffect } from "react";
import { fetchRequest } from "@/lib/api";
import { BorrowedBook, BorrowedBooksResponse, Pagination } from "@/types";
import { toast } from "sonner";
import { Loading } from "./Loading";
import { ErrorComponent } from "./ErrorComponent";
import { BorrowedBookSectionHeader } from "./BorrowedBookSectionHeader";
import NoBooks from "./NoBooks";
import PaginationComponent from "./Pagination";
import BookContainer from "./BookContainer";

export function BorrowedBookSection() {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 4,
  });

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const uri = `${process.env.NEXT_PUBLIC_API}/book/get-user-borrowed-books?page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`;
      const response = await fetchRequest(uri, "GET", undefined, token);
      const data: BorrowedBooksResponse = response.data;

      if (data.success) {
        setBorrowedBooks(data.data);
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalItems: data.pagination.totalItems,
          itemsPerPage: data.pagination.itemsPerPage,
        });
      } else {
        toast.error("Failed to fetch borrowed books", {
          style: { backgroundColor: "red", color: "#fff" },
        });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load borrowed books"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, [pagination.currentPage, pagination.itemsPerPage]);

  const handleViewAll = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      itemsPerPage: 10, // Show more items when "View All" is clicked
    }));
  };

  const handleRefresh = () => {
    fetchBorrowedBooks();
  };

  if (loading) {
    return <Loading handleRefresh={handleRefresh} />;
  }

  if (error) {
    <ErrorComponent error={error} handleRefresh={handleRefresh} />;
  }

  return (
    <div className="w-full xl:flex-1">
      {/* Header */}
      <BorrowedBookSectionHeader
        handleRefresh={handleRefresh}
        handleViewAll={handleViewAll}
        borrowedBooks={borrowedBooks}
        pagination={pagination}
      />

      {borrowedBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
            {borrowedBooks.map((item) => {
              return <BookContainer key={item.borrowRecord._id} item={item} />;
            })}
          </div>

          {pagination.totalPages > 1 && (
            <PaginationComponent
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </>
      ) : (
        <NoBooks />
      )}
    </div>
  );
}
