import { welcomeTemplate } from "./welcome";
import { inactiveTemplate } from "./inactive";
import { activeTemplate } from "./active";
import newsletterTemplate from "./newsletter";
import { EmailBook } from "../utils";
import { accountApprovalTemplate } from "./account-approval";
import { checkInTemplate } from "./30days-inactive";
import { accountRejectionTemplate } from "./account-rejection";
import { bookDueReminderTemplate } from "./book-due-date";
import { bookReceiptTemplate } from "./book-receipt";
import { bookBorrowedTemplate } from "./borrowed-book";
import { bookReturnConfirmationTemplate } from "./return-confirmation";

export const TEMPLATES = {
  welcome: (name: string, loginUrl: string) => welcomeTemplate(name, loginUrl),
  active: (name: string, loginUrl: string) => activeTemplate(name, loginUrl),
  newsletter: (name: string, books: EmailBook[]) =>
    newsletterTemplate(name, books),
  inactive: (name: string, loginUrl: string) =>
    inactiveTemplate(name, loginUrl),
  accountApprovalTemplate: (name: string, loginUrl: string) =>
    accountApprovalTemplate(name, loginUrl),
  checkInTemplate: (name: string, loginUrl: string) =>
    checkInTemplate(name, loginUrl),
  accountRejectionTemplate: (name: string, loginUrl: string) =>
    accountRejectionTemplate(name, loginUrl),
  bookDueReminderTemplate: (
    name: string,
    bookTitle: string,
    dueDate: string,
    renewUrl: string
  ) => bookDueReminderTemplate(name, bookTitle, dueDate, renewUrl),
  bookReceiptTemplate: (
    name: string,
    bookTitle: string,
    borrowDate: string,
    dueDate: string,
    receiptDownloadUrl: string
  ) =>
    bookReceiptTemplate(
      name,
      bookTitle,
      borrowDate,
      dueDate,
      receiptDownloadUrl
    ),

  bookBorrowedTemplate: (
    name: string,
    bookTitle: string,
    borrowDate: string,
    dueDate: string,
    borrowedBooksUrl: string
  ) =>
    bookBorrowedTemplate(
      name,
      bookTitle,
      borrowDate,
      dueDate,
      borrowedBooksUrl
    ),

  bookReturnConfirmationTemplate: (
    name: string,
    bookTitle: string,
    exploreUrl: string
  ) => bookReturnConfirmationTemplate(name, bookTitle, exploreUrl),
  // ...other templates
};
