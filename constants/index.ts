export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Borrow Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
  profilePic: "Upload your Profile picture",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "text",
  password: "password",
};

export interface User {
  name: string;
  email: string;
  role: string;
  booksBorrowed: number;
  universityID: string;
  dateJoined: string;
}

export const bookTitles = [
  "Book Title",
  "Author",
  "Genre",
  "Date Created",
  "Action",
];

export const bookBorrowRecordsTitles = [
  "Book",
  "User Requested",
  "Status",
  "Borrowed date",
  "Return date",
  "Due Date",
  "Receipt",
];

export const genres = [
  "Programming",
  "Computer Science",
  "Science Fiction",
  "System Design",
  "Web Development",
  "Software",
  "Self Help",
];

export function getUserTableHeaders(type: "ALL USERS" | "ACCOUNT REQUEST") {
  return [
    "Name",
    "Date Joined",
    ...(type === "ALL USERS" ? ["Role", "Books Borrowed"] : []),
    "University ID No",
    "University ID Card",
    "Action",
  ];
}
