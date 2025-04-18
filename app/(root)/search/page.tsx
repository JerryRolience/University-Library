"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchHeroSection } from "@/components/home/SearchHeroSection";
import { BookListSection } from "@/components/Books/search/BookListSection";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [filter, setFilter] = useState("all");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10, // Match your DEFAULT_PAGE_SIZE from backend
    total: 0,
    totalPages: 1,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial load and handle search from URL params
  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    const urlFilter = searchParams.get("filter") || "all";
    const urlMinRating = searchParams.get("minRating");
    const urlMaxRating = searchParams.get("maxRating");
    const urlAvailableOnly = searchParams.get("availableOnly") === "true";
    const urlPage = Number(searchParams.get("page")) || 1;

    setSearchQuery(urlQuery);
    setFilter(urlFilter);
    setMinRating(urlMinRating ? Number(urlMinRating) : null);
    setMaxRating(urlMaxRating ? Number(urlMaxRating) : null);
    setAvailableOnly(urlAvailableOnly);

    // Perform initial search
    performSearch(
      urlQuery,
      urlFilter,
      urlMinRating ? Number(urlMinRating) : null,
      urlMaxRating ? Number(urlMaxRating) : null,
      urlAvailableOnly,
      urlPage
    );
  }, [searchParams]);

  // Perform actual search with API
  const performSearch = async (
    query: string,
    currentFilter: string,
    minRatingParam: number | null = null,
    maxRatingParam: number | null = null,
    availableOnlyParam: boolean = false,
    page: number = 1
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (currentFilter !== "all") params.set("genre", currentFilter);
      if (minRatingParam !== null)
        params.set("minRating", minRatingParam.toString());
      if (maxRatingParam !== null)
        params.set("maxRating", maxRatingParam.toString());
      if (availableOnlyParam) params.set("availableOnly", "true");
      params.set("page", page.toString());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/book/search-book?${params.toString()}`
      );
      const data = await res.json();

      setSearchResults(data.results || []);
      setPagination({
        page: data.page || 1,
        pageSize: data.pageSize || 10,
        total: data.total || 0,
        totalPages: data.totalPages || 1,
      });
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update URL when search changes
  const updateSearchURL = (
    query: string,
    filterValue: string,
    minRatingValue: number | null = null,
    maxRatingValue: number | null = null,
    availableOnlyValue: boolean = false,
    page: number = 1
  ) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (filterValue !== "all") params.set("filter", filterValue);
    if (minRatingValue !== null)
      params.set("minRating", minRatingValue.toString());
    if (maxRatingValue !== null)
      params.set("maxRating", maxRatingValue.toString());
    if (availableOnlyValue) params.set("availableOnly", "true");
    params.set("page", page.toString());

    router.push(`/search?${params.toString()}`);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    updateSearchURL(
      searchQuery,
      filter,
      minRating,
      maxRating,
      availableOnly,
      newPage
    );
  };

  // Handle search submission
  const handleSearch = () => {
    // Reset to first page when performing a new search
    updateSearchURL(
      searchQuery,
      filter,
      minRating,
      maxRating,
      availableOnly,
      1
    );
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilter(value);
    // Reset to first page when changing filters
    updateSearchURL(searchQuery, value, minRating, maxRating, availableOnly, 1);
  };

  // Handle rating filter change
  const handleRatingChange = (type: "min" | "max", value: number | null) => {
    if (type === "min") {
      setMinRating(value);
    } else {
      setMaxRating(value);
    }
    // Reset to first page when changing filters
    updateSearchURL(
      searchQuery,
      filter,
      type === "min" ? value : minRating,
      type === "max" ? value : maxRating,
      availableOnly,
      1
    );
  };

  // Handle available only toggle
  const handleAvailableOnlyChange = (checked: boolean) => {
    setAvailableOnly(checked);
    // Reset to first page when changing filters
    updateSearchURL(searchQuery, filter, minRating, maxRating, checked, 1);
  };

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setFilter("all");
    setMinRating(null);
    setMaxRating(null);
    setAvailableOnly(false);
    setSearchResults([]);
    setHasSearched(false);
    setPagination({
      page: 1,
      pageSize: 8,
      total: 0,
      totalPages: 1,
    });
    router.push("/search");
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        searchQuery ||
        filter !== "all" ||
        minRating !== null ||
        maxRating !== null ||
        availableOnly
      ) {
        updateSearchURL(
          searchQuery,
          filter,
          minRating,
          maxRating,
          availableOnly,
          pagination.page
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    filter,
    minRating,
    maxRating,
    availableOnly,
    pagination.page,
  ]);

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
        minRating={minRating}
        maxRating={maxRating}
        handleRatingChange={handleRatingChange}
        availableOnly={availableOnly}
        handleAvailableOnlyChange={handleAvailableOnlyChange}
        loading={loading}
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </main>
  );
}
