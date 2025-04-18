import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui";
import { genres } from "@/constants";
import { Filter, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { SearchFilterProps } from "@/components/utils/types";
import { Label } from "@/components/ui/label";

export function SearchFilterBox({
  showFilter,
  searchQuery,
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
}: SearchFilterProps) {
  console.log("Filter", filter);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {hasSearched ? (
        <h2 className="text-xl md:text-2xl font-semibold text-light-100">
          {loading
            ? "Searching..."
            : `Search Results (${pagination.total} found)`}
          {!loading && searchQuery && (
            <span className="text-light-200"> for "{searchQuery}"</span>
          )}
          {!loading && filter && (
            <span className="text-light-200"> for "{filter}"</span>
          )}
        </h2>
      ) : (
        <h2 className="text-xl md:text-2xl font-semibold text-light-100">
          {loading ? "Loading books..." : "Browse Books"}
        </h2>
      )}

      {showFilter && (
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-dark-100 text-dark-100 hover:text-primary transition-colors">
                <Filter size={16} />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Genre</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={filter}
                onValueChange={handleFilterChange}
              >
                <DropdownMenuRadioItem value="all">
                  All Genres
                </DropdownMenuRadioItem>
                {genres.map((genre) => (
                  <DropdownMenuRadioItem key={genre} value={genre}>
                    {genre}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Rating</DropdownMenuLabel>
              <div className="px-2 py-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <Input
                    placeholder="Min"
                    value={minRating || ""}
                    onChange={(e) =>
                      handleRatingChange(
                        "min",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="h-8 w-16"
                  />
                  <span>-</span>
                  <Input
                    placeholder="Max"
                    value={maxRating || ""}
                    onChange={(e) =>
                      handleRatingChange(
                        "max",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="h-8 w-16"
                  />
                </div>
              </div>

              <DropdownMenuSeparator />

              <div className="flex items-center space-x-2 px-2 py-1">
                <Switch
                  id="available-only"
                  checked={availableOnly}
                  onCheckedChange={handleAvailableOnlyChange}
                />
                <Label htmlFor="available-only">Available Only</Label>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasSearched && (
            <Button
              disabled={searchQuery === "" && filter === "all"}
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
  );
}
