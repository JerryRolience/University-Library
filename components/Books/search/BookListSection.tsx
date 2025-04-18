import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import SearchBookList from "./SearchBookList";
import { BookListSectionProps } from "@/components/utils/types";
import { SearchFilterBox } from "./SearchFilterBox";
import { NoSearchResults } from "./NoSearchResults";

export function BookListSection({
  searchQuery,
  searchResults,
  hasSearched,
  clearSearch,
  handleFilterChange,
  filter,
  minRating,
  maxRating,
  handleRatingChange,
  availableOnly,
  handleAvailableOnlyChange,
  loading,
  pagination,
  handlePageChange,
}: BookListSectionProps) {
  const showFilter = searchResults.length > 0;

  return (
    <div className="md:-mt-8 max-w-full">
      {(hasSearched || showFilter) && (
        <SearchFilterBox
          availableOnly={availableOnly}
          clearSearch={clearSearch}
          searchQuery={searchQuery}
          handleAvailableOnlyChange={handleAvailableOnlyChange}
          filter={filter}
          handleFilterChange={handleFilterChange}
          minRating={minRating}
          maxRating={maxRating}
          handleRatingChange={handleRatingChange}
          hasSearched={hasSearched}
          loading={loading}
          pagination={pagination}
          showFilter={showFilter}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-light-100">Loading books...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <>
          <SearchBookList
            title={""}
            books={searchResults}
            containerClassName="mt-6 "
            variant="medium"
          />

          {/* Pagination Controls */}
          <div className="flex  flex-col space-y-8 md:space-y-0 md:flex-row items-center  justify-between mt-8">
            <div className="text-sm text-light-200">
              Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
              {Math.min(
                pagination.page * pagination.pageSize,
                pagination.total
              )}{" "}
              of {pagination.total} books
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={Number(pagination.page) === 1}
                className="gap-1 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-colors"
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(Number(pagination.page) - 1)}
                disabled={Number(pagination.page) === 1}
                className="gap-1 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>

              <div className="flex items-center justify-center rounded-md bg-primary/10 px-4 py-2">
                <span className="text-sm font-medium text-primary">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(Number(pagination.page) + 1)}
                disabled={
                  Number(pagination.page) === Number(pagination.totalPages)
                }
                className="gap-1 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(Number(pagination.totalPages))}
                disabled={
                  Number(pagination.page) === Number(pagination.totalPages)
                }
                className="gap-1 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-colors"
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <NoSearchResults clearSearch={clearSearch} hasSearched={hasSearched} />
      )}
    </div>
  );
}
