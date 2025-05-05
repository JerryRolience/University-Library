import { welcomeTemplate } from "./welcome";
import { inactiveTemplate } from "./inactive";
import { activeTemplate } from "./active";
import newsletterTemplate from "./newsletter";
import { EmailBook } from "../utils";
import { accountApprovalTemplate } from "./account-approval";
import { checkInTemplate } from "./30days-inactive";
import { accountRejectionTemplate } from "./account-rejection";
import { bookDueDateReminderTemplate } from "./book-due-date";
import { bookReceiptTemplate } from "./book-receipt";
import { bookBorrowedTemplate } from "./borrowed-book";
import { bookReturnConfirmationTemplate } from "./return-confirmation";
import { bookPreDueReminderTemplate } from "./book-predue-date";
import { bookOverdueTemplate } from "./book-overdue";
import { resetPasswordTemplate } from "./reset-password";

export const TEMPLATES = {
  welcome: (name: string, loginUrl: string) => welcomeTemplate(name, loginUrl),
  active: (name: string, loginUrl: string) => activeTemplate(name, loginUrl),
  newsletter: (name: string, books: EmailBook[]) => newsletterTemplate(name, books),
  inactive: (name: string, loginUrl: string) => inactiveTemplate(name, loginUrl),
  checkInTemplate: (name: string, loginUrl: string) => checkInTemplate(name, loginUrl),
  accountApprovalTemplate: (name: string, loginUrl: string) => accountApprovalTemplate(name, loginUrl),
  accountRejectionTemplate: (name: string, loginUrl: string) => accountRejectionTemplate(name, loginUrl),
  bookDueDateReminderTemplate: (name: string, bookTitle: string, dueDate: string, renewUrl: string) => bookDueDateReminderTemplate(name, bookTitle, dueDate, renewUrl),
  bookPreDueReminderTemplate: (name: string, bookTitle: string, dueDate: string, renewUrl: string) => bookPreDueReminderTemplate(name, bookTitle, dueDate, renewUrl),
  bookOverdueTemplate: (name: string, bookTitle: string, dueDate: string, daysOverdue: number, renewUrl: string) => bookOverdueTemplate(name, bookTitle, dueDate, daysOverdue, renewUrl),
  bookReceiptTemplate: (name: string, bookTitle: string, borrowDate: string, dueDate: string, receiptDownloadUrl: string) =>
    bookReceiptTemplate(name, bookTitle, borrowDate, dueDate, receiptDownloadUrl),

  bookBorrowedTemplate: (name: string, bookTitle: string, borrowDate: string, dueDate: string, borrowedBooksUrl: string) =>
    bookBorrowedTemplate(name, bookTitle, borrowDate, dueDate, borrowedBooksUrl),

  bookReturnConfirmationTemplate: (name: string, bookTitle: string, exploreUrl: string) => bookReturnConfirmationTemplate(name, bookTitle, exploreUrl),

  resetPasswordTemplate: (resetUrl: string) => resetPasswordTemplate(resetUrl),
  // ...other templates
};
