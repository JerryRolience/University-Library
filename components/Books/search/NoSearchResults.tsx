import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui";

export function NoSearchResults({
  hasSearched,
  clearSearch,
}: {
  hasSearched: boolean;
  clearSearch: () => void;
}) {
  return (
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
            : "There are currently no books in the library."}
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
  );
}
