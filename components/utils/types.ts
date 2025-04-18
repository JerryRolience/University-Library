export interface BookListSectionProps {
  searchQuery: string;
  searchResults: any[];
  hasSearched: boolean;
  clearSearch: () => void;
  handleFilterChange: (value: string) => void;
  filter: string;
  minRating: number | null;
  maxRating: number | null;
  handleRatingChange: (type: "min" | "max", value: number | null) => void;
  availableOnly: boolean;
  handleAvailableOnlyChange: (checked: boolean) => void;
  loading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  handlePageChange: (page: number) => void;
}
export interface SearchFilterProps {
  showFilter?: boolean;
  searchQuery: string;
  hasSearched: boolean;
  clearSearch: () => void;
  handleFilterChange: (value: string) => void;
  filter: string;
  minRating: number | null;
  maxRating: number | null;
  handleRatingChange: (type: "min" | "max", value: number | null) => void;
  availableOnly: boolean;
  handleAvailableOnlyChange: (checked: boolean) => void;
  loading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
