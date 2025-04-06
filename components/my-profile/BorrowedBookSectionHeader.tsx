import { BorrowedBook, Pagination } from "@/types";
import { IoRefresh } from "react-icons/io5";

export function BorrowedBookSectionHeader({
  handleRefresh,
  handleViewAll,
  borrowedBooks,
  pagination,
}: {
  handleRefresh: () => void;
  handleViewAll: () => void;
  borrowedBooks: BorrowedBook[];
  pagination: Pagination;
}) {
  return (
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-light-100">
        Borrowed Books
      </h2>
      <div className="flex items-center gap-3">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 text-xs sm:text-sm text-light-200 hover:text-light-100 transition-colors"
        >
          <IoRefresh size={14} />
          Refresh
        </button>
        {borrowedBooks.length > 0 &&
          pagination.itemsPerPage < pagination.totalItems && (
            <button
              onClick={handleViewAll}
              className="text-xs sm:text-sm text-light-200 hover:text-light-100 transition-colors"
            >
              View All
            </button>
          )}
      </div>
    </div>
  );
}
