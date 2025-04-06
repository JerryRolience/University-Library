"use client";

import { sampleBooks } from "@/constants";
import { useState, useEffect } from "react";
import { SearchHeroSection } from "@/components/home/SearchHeroSection";
import { BookListSection } from "@/components/Books/BookListSection";

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
      <SearchHeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Book List Section */}
      <BookListSection
        hasSearched={hasSearched}
        searchQuery={searchQuery}
        searchResults={searchResults}
        clearSearch={clearSearch}
        handleFilterChange={handleFilterChange}
        filter={filter}
        departments={departments}
      />
    </main>
  );
}
