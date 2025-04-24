import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/email/send-email";
import { fetchRequest } from "@/lib/api";
import { subDays, isBefore } from "date-fns";
import { formatDate } from "@/lib/util";

type BorrowPayload = {
  email: string;
  fullName: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  borrowId: string;
};

type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE" | "NOT_FOUND";

export const { POST } = serve<BorrowPayload>(async (ctx) => {
  const { email, fullName, bookTitle, borrowDate, dueDate, borrowId } =
    ctx.requestPayload;

  // Step 1: Send confirmation email
  try {
    await ctx.run("send-borrow-confirmation", async () => {
      await sendEmail("bookBorrowedTemplate", email, {
        fullName,
        bookTitle,
        borrowDate: formatDate(borrowDate),
        dueDate: formatDate(dueDate),
      });
      console.log("Borrow confirmation email sent");
    });
  } catch (error) {
    console.error("Failed to send borrow confirmation:", error);
  }

  try {
    await ctx.run("send-book-receipt-confirmation", async () => {
      await sendEmail("bookReceiptTemplate", email, {
        fullName,
        bookTitle,
        borrowDate: formatDate(borrowDate),
        dueDate: formatDate(dueDate),
      });
      console.log("Book receipt confirmation email sent");
    });
  } catch (error) {
    console.error("Failed to send book receipt confirmation:", error);
  }

  // Step 2: Prepare dates
  const due = new Date(
    await ctx.run("parse-due-date", () => new Date(dueDate))
  );
  const now = new Date(await ctx.run("get-now", () => new Date()));
  const remindDate = subDays(due, 2);

  // TEST MODIFICATION: Wait 5 seconds instead of 2 days
  if (isBefore(now, remindDate)) {
    await ctx.sleep("wait-2-days-before-due", 5); // 5 seconds instead of 2 days
  }

  // Step 4: Send reminder if not returned
  try {
    await ctx.run("send-pre-due-reminder", async () => {
      const status = await getBorrowStatus(borrowId);
      if (status === "BORROWED") {
        await sendEmail("bookPreDueReminderTemplate", email, {
          fullName,
          bookTitle,
          dueDate: formatDate(dueDate),
        });
        console.log("Pre-due reminder email sent");
      }
    });
  } catch (error) {
    console.error("Failed to send pre-due reminder:", error);
  }

  // TEST MODIFICATION: Wait 5 seconds instead of until due date
  await ctx.sleep("wait-until-due-date", 5); // 5 seconds instead of actual wait

  // Step 6: Send due date reminder
  try {
    await ctx.run("send-due-date-reminder", async () => {
      const status = await getBorrowStatus(borrowId);
      if (status === "BORROWED") {
        await sendEmail("bookDueDateReminderTemplate", email, {
          fullName,
          bookTitle,
          dueDate,
        });
        console.log("Due date reminder email sent");
      }
    });
  } catch (error) {
    console.error("Failed to send due date reminder:", error);
  }

  // TEST MODIFICATION: Overdue loop (every 5 seconds, max 3 times)
  let overdueCount = 0;
  while (overdueCount < 3) {
    // Reduced from 12 to 3 for testing
    overdueCount++;
    await ctx.sleep(`wait-5-days-overdue-${overdueCount}`, 5); // 5 seconds instead of 5 days

    let status: BorrowStatus = "BORROWED";
    try {
      status = await getBorrowStatus(borrowId);
    } catch (error) {
      console.error("Failed to check borrow status:", error);
    }

    if (status === "NOT_FOUND") {
      console.log(`Borrow record ${borrowId} not found, stopping reminders`);
      break;
    }

    if (status === "RETURNED") {
      console.log(`Book ${borrowId} returned, cancelling workflow`);
      ctx.cancel();
    }

    try {
      await ctx.run(`send-overdue-reminder-${overdueCount}`, async () => {
        await sendEmail("bookOverdueTemplate", email, {
          fullName,
          bookTitle,
          dueDate: formatDate(dueDate),
          daysOverdue: overdueCount * 5,
        });
        console.log(`Overdue reminder #${overdueCount} email sent`);
      });
    } catch (error) {
      console.error("Failed to send overdue reminder:", error);
    }
  }
});

async function getBorrowStatus(borrowId: string): Promise<BorrowStatus> {
  try {
    const response = await fetchRequest(
      `${process.env.NEXT_PUBLIC_API}/book/borrow-status`,
      "POST",
      { borrowId }
    );

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    return response.data.status;
  } catch (error) {
    console.error("Failed to get borrow status:", error);
    return "BORROWED"; // fallback to continue the workflow
  }
}
