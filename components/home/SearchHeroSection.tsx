import Image from "next/image";
import { Input } from "../ui/input";

export function SearchHeroSection({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="max-w-2xl w-full text-center space-y-4">
        <h3 className="text-lg font-ibm-plex-sans capitalize text-light-100">
          Discover your next great read:
        </h3>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-ibm-plex-sans font-semibold text-light-100 leading-tight">
          Explore And Search For <span className="text-primary">Any Book</span>{" "}
          In Our Library
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
  );
}
