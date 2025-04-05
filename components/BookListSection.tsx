import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import BookList from "@/components/BookList";
import Image from "next/image";

export function BookListSection({
  searchQuery,
  searchResults,
  hasSearched,
  clearSearch,
  handleFilterChange,
  filter,
  departments,
}: {
  searchQuery: string;
  searchResults: any[];
  hasSearched: boolean;
  clearSearch: () => void;
  handleFilterChange: (value: string) => void;
  filter: string;
  departments: string[];
}) {
  const showFilter = searchResults.length > 0 || !hasSearched;

  return (
    <div className="md:-mt-8 max-w-full">
      {(hasSearched || showFilter) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          {hasSearched ? (
            <h2 className="text-xl md:text-2xl font-semibold text-light-100">
              Search Results for{" "}
              <span className="text-light-200">"{searchQuery}"</span>
            </h2>
          ) : (
            <h2 className="text-xl md:text-2xl font-semibold text-light-100">
              Browse Books
            </h2>
          )}

          {showFilter && (
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-dark-100 text-dark-100 hover:text-primary transition-colors">
                    <Filter size={16} />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={filter}
                    onValueChange={handleFilterChange}
                  >
                    {departments.map((dept) => (
                      <DropdownMenuRadioItem
                        key={dept}
                        value={dept}
                        className="capitalize"
                      >
                        {dept === "all" ? "All Departments" : dept}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {hasSearched && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  className="text-primary hover:text-dark-100 hover:bg-primary transition-colors"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {searchResults.length > 0 ? (
        <BookList
          title={""}
          books={searchResults}
          containerClassName="mt-6"
          variant="medium"
        />
      ) : (
        <div className="text-center py-8 px-4">
          <div className="max-w-md mx-auto">
            <Image
              src="/images/no-results.png"
              alt="No results found"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-white mb-3">
              {hasSearched ? "No Results Found" : "No Books Available"}
            </h3>
            <p className="text-light-100 mb-6">
              {hasSearched
                ? "We couldn't find any books matching your search. Try using different keywords or check for typos."
                : "There are currently no books in this category."}
            </p>
            {hasSearched && (
              <Button
                onClick={clearSearch}
                variant="outline"
                className="not-found-btn"
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
