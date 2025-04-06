import { ZodType } from "zod";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface DataBaseBooks {
  _id: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  del?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isLoanedBook?: boolean;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface BookCoverProps {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

interface BookListProps {
  title: string;
  books: DataBaseBooks[];
  containerClassName: string;
}

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  onSubmit: (response, email, fullName) => void;
  defaultValues: T;
}

interface BookFormProps extends Partial<Book> {
  type: "create" | "update";
}

interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
  onFileChange: (filePath: string) => void;
}

interface User {
  name: string;
  email: string;
  role: string;
  universityID: string;
  universityCard: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  books: DataBaseBooks[] | null;
  books: Book[];
  loadingBooks: boolean;
  errorBooks: string | null;
  fetchBooks: () => Promise<void>;
  refreshToken: string | null;
  login: (token: string, refreshToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
  isAuthenticated: boolean;
  loading: boolean;
}

interface BorrowRecord {
  _id: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  status: string;
}

interface BookDetail {
  _id: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  coverColor: string;
  rating: number;
  description: string;
}

interface BorrowedBook {
  borrowRecord: BorrowRecord;
  bookDetail: BookDetail;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface BorrowedBooksResponse {
  success: boolean;
  data: BorrowedBook[];
  pagination: Pagination;
}
