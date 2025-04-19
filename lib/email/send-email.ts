import { transporter } from "./transpoter";
import { TEMPLATES } from "./templates";
import { EmailBook, EmailData } from "./utils";

export type EmailType = keyof typeof TEMPLATES;

export async function sendEmail(
  type: EmailType,
  email: string,
  data: EmailData = {}
) {
  const loginUrl = `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}sign-in`;
  const receiptDownloadUrl = `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}my-profile`;
  let template;

  if (type === "newsletter") {
    template = TEMPLATES.newsletter(
      data.fullName || "User",
      data.books as EmailBook[]
    );
  } else if (type === "bookDueReminderTemplate") {
    template = TEMPLATES[type](
      data.fullName || "User",
      data.bookTitle || "Unknown Book",
      data.dueDate || "Unknown Due Date",
      loginUrl
    );
  } else if (type === "bookBorrowedTemplate") {
    template = TEMPLATES[type](
      data.fullName || "User",
      data.bookTitle || "Unknown Book",
      data.borrowDate || "Unknown Due Date",
      data.dueDate || "Unknown Due Date",
      receiptDownloadUrl
    );
  } else if (type === "bookReceiptTemplate") {
    template = TEMPLATES[type](
      data.fullName || "User",
      data.bookTitle || "Unknown Book",
      data.borrowDateDate || "Unknown Due Date",
      data.dueDate || "Unknown Due Date",
      receiptDownloadUrl
    );
  } else if (type === "bookReturnConfirmationTemplate") {
    template = TEMPLATES[type](
      data.fullName || "User",
      data.bookTitle || "Unknown Book",
      loginUrl
    );
  } else {
    template = TEMPLATES[type](data.fullName || "User", loginUrl);
  }

  const mailOptions = {
    from: `"BookWise" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: template?.subject,
    html: template?.html,
    text: template?.text,
    headers: {
      "X-Entity-Ref-ID": Date.now().toString(),
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent ${type} email to ${email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send ${type} email to ${email}:`, error);
    throw error;
  }
}
