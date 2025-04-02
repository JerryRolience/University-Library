"use client";

import BookList from "@/components/BookList";
import { Input } from "@/components/ui/input";
import { sampleBooks } from "@/constants";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(sampleBooks);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults(sampleBooks);
      setHasSearched(false);
      return;
    }

    const results = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(sampleBooks);
    setHasSearched(false);
  };

  // Trigger search when user stops typing (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <main className="container mx-auto px-4 py-6 md:-mt-20">
      {/* Hero Search Section */}
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="max-w-2xl w-full text-center space-y-4">
          <h3 className="text-lg font-ibm-plex-sans capitalize text-light-100">
            Discover your next great read:
          </h3>

          <h1 className="text-5xl font-ibm-plex-sans font-semibold text-light-100 leading-tight">
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
      <div className=" mt-12 md:-mt-8">
        {hasSearched && (
          <div className="flex justify-between items-center mb-6">
            <h2 className=" text-xl md:text-2xl font-semibold text-light-100">
              Search Results for{" "}
              <span className="text-light-200">"{searchQuery}"</span>
            </h2>
            <button
              onClick={clearSearch}
              className="text-primary hover:text-primary-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {searchResults.length > 0 ? (
          <BookList
            title={hasSearched ? "" : "Latest Books"}
            books={searchResults}
            containerClassName="mt-6 "
            variant="medium"
          />
        ) : (
          <div className="text-center py-8">
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
              <button
                onClick={clearSearch}
                className="w-[360px] h-[48px] bg-primary hover:bg-primary/55 text-dark-300 font-semibold rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
