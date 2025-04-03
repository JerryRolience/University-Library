"use client";

import BookList from "@/components/BookList";
import { Input } from "@/components/ui/input";
import { sampleBooks } from "@/constants";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(sampleBooks);
  const [hasSearched, setHasSearched] = useState(false);
  const [filter, setFilter] = useState("all");
  const [departments, setDepartments] = useState<string[]>([]);

  // Extract unique departments from sample books
  useEffect(() => {
    const uniqueDepartments = Array.from(
      new Set(sampleBooks.map((book) => "General"))
    );
    setDepartments(["all", ...uniqueDepartments]);
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      applyFilter(sampleBooks, filter);
      setHasSearched(false);
      return;
    }

    const results = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    applyFilter(results, filter);
    setHasSearched(true);
  };

  // Apply department filter
  const applyFilter = (books: typeof sampleBooks, currentFilter: string) => {
    if (currentFilter === "all") {
      setSearchResults(books);
    } else {
      const filtered = books.filter((book) => "" === currentFilter);
      setSearchResults(filtered);
    }
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilter(value);
    applyFilter(searchQuery.trim() === "" ? sampleBooks : searchResults, value);
  };

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setFilter("all");
    setSearchResults(sampleBooks);
    setHasSearched(false);
  };

  // Trigger search when user stops typing (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, filter]);

  return (
    <main className="mx-auto px-4 py-6 -mt-20 md:-mt-20 overflow-x-hidden">
      {/* Hero Search Section */}
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="max-w-2xl w-full text-center space-y-4">
          <h3 className="text-lg font-ibm-plex-sans capitalize text-light-100">
            Discover your next great read:
          </h3>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-ibm-plex-sans font-semibold text-light-100 leading-tight">
            Explore And Search For{" "}
            <span className="text-primary">Any Book</span> In Our Library
          </h1>

          <div className="relative w-full max-w-[630px] mx-auto">
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-dark-300/20 rounded-full transition-colors"
              onClick={handleSearch}
            >
              <Image
                src="/icons/search-fill.svg"
                alt="search"
                width={24}
                height={24}
              />
            </button>
            <Input
              type="text"
              placeholder="Search for books..."
              className="w-full pl-12 pr-4 py-8 rounded-lg bg-dark-300 border-dark-500 text-light-100 placeholder:text-dark-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
      </div>

      {/* Book List Section */}
      <div className="md:-mt-8 max-w-full">
        {hasSearched && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-light-100">
              Search Results for{" "}
              <span className="text-light-200">"{searchQuery}"</span>
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-dark-100 text-dark-100 hover:text-primary transition-colors ">
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
              <Button
                onClick={clearSearch}
                variant="ghost"
                className="text-primary hover:text-dark-100 hover:bg-primary transition-colors"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {searchResults.length > 0 ? (
          <BookList
            title={hasSearched ? "" : "Latest Books"}
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
                No Results Found
              </h3>
              <p className="text-light-100 mb-6">
                We couldn't find any books matching your search.
                <br />
                Try using different keywords or check for typos.
              </p>
              <Button
                onClick={clearSearch}
                variant="outline"
                className="not-found-btn"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
