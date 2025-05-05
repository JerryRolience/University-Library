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

interface BorrowRecords {
  BookId: string;
  BookTitle: string;
  BookCoverUrl: string;
  BookCoverColor: string;
  BookAuthor: string;
  BookGenre: string;
  UserName: string;
  UserProfilePic: string;
  UserEmail: string;
  Status: string;
  BorrowDate: Date;
  DueDate: Date;
  ReturnedDate?: Date;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide" | "borrow";

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
  defaultValues: T & { profilePic?: string };
}

interface EditProfileFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  onSubmit: (response) => void;
  defaultValues: T;
}
interface EditProfilePicFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  onSubmit: (response) => void;
  defaultValues: T;
}

interface BookFormProps {
  type: "create" | "update";
  book?: DataBaseBooks;
}

interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
  onFileChange: (filePath: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

interface UserTableProps {
  initialUsers: AllUser[];
  title: string;
  sort: string;
  type: "ALL USERS" | "ACCOUNT REQUEST";
  sortAsc: boolean;
  loadingUsers: boolean;
  errorUsers: string | null;
  sortByName: () => void;
  fetchUsers: () => Promise<void>;
}

interface UserContextType {
  users: AllUser[];
  loadingUsers: boolean;
  errorUsers: string | null;
  sortAsc: boolean;
  fetchUsers: () => Promise<void>;
  sortByName: () => void;
}

interface User {
  name: string;
  email: string;
  role: string;
  universityID: string;
  universityCard: string;
  profilePic?: string;
  status: string;
}

interface AllUser extends User {
  profilePic?: string | null;
  booksBorrowed: number;
  dateJoined: Date;
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
  editProfile: (data: User) => Promise<void>;
  editProfilePic: (data: User) => Promise<void>;
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

interface DropdownOption {
  value: string;
  label: string;
  colorClass: string;
  backgroundColor: string;
}

interface StatusAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  user: {
    role: string;
  };
}

type ROLES = "ADMIN" | "SUPER_ADMIN" | "USER" | "STUDENT";

interface StatusDropdownProps<T extends string> {
  currentValue: "ADMIN" | "SUPER_ADMIN" | "USER";
  onStatusChange: (newValue: ROLES) => void;
  options: DropdownOption[];
  className?: string;
}

interface ActionDialogProps {
  type: "Approve Account Request" | "Deny Account Request";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  fetchUsers?: () => Promise<void>;
}

interface DeleteAlertDialogProps {
  type: "Delete User" | "Delete Book";
  open: boolean;
  book: {
    bookId: string;
    bookTitle: string;
  };
  onOpenChange: (open: boolean) => void;
  fetchUsers?: () => Promise<void>;
  fetchBooks?: () => Promise<void>;

  user?: User;
}

interface ViewCardDialogProps {
  IDCard: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
