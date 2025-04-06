import { Pagination } from "@/types";
import { Button } from "../ui/button";

export default function PaginationComponent({
  pagination,
  setPagination,
}: {
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <Button
        onClick={() =>
          setPagination((prev) => ({
            ...prev,
            currentPage: Math.max(1, prev.currentPage - 1),
          }))
        }
        disabled={pagination.currentPage === 1}
        className="px-4 py-1 bg-primary rounded disabled:opacity-50  hover:bg-primary/70 transition-colors"
      >
        Previous
      </Button>
      <span className="px-3 py-1 text-sm text-light-200">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <Button
        onClick={() =>
          setPagination((prev) => ({
            ...prev,
            currentPage: Math.min(pagination.totalPages, prev.currentPage + 1),
          }))
        }
        disabled={pagination.currentPage === pagination.totalPages}
        className="px-7 py-1 bg-primary rounded disabled:opacity-50 hover:bg-primary/70 transition-colors"
      >
        Next
      </Button>
    </div>
  );
}
