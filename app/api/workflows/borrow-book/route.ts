import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/email/send-email";
import { fetchRequest } from "@/lib/api";
import { subDays, isBefore } from "date-fns";

type BorrowPayload = {
  email: string;
  fullName: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  borrowId: string;
  testMode?: boolean; // Add test mode flag
};

type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE" | "NOT_FOUND";

export const { POST } = serve<BorrowPayload>(async (ctx) => {
  const {
    email,
    fullName,
    bookTitle,
    borrowDate,
    dueDate,
    borrowId,
    testMode = true, // Default to false
  } = ctx.requestPayload;

  // TEST MODE: Speed up all delays by this factor (e.g., 1 second instead of 1 day)
  const timeFactor = testMode ? 24 * 60 * 60 : 1;

  // Step 1: Send confirmation email
  try {
    await ctx.run("send-borrow-confirmation", async () => {
      await sendEmail("bookBorrowedTemplate", email, {
        fullName,
        bookTitle,
        borrowDate,
        dueDate,
      });
    });
  } catch (error) {
    console.error("Failed to send borrow confirmation:", error);
  }

  // Step 2: Prepare dates
  const due = new Date(dueDate);
  const now = new Date();
  const remindDate = subDays(due, 2);

  // Step 3: Wait until 2 days before dueDate (or reduced time in test mode)
  if (isBefore(now, remindDate)) {
    let msUntilRemind = remindDate.getTime() - now.getTime();
    if (testMode) msUntilRemind = 5000; // 5 seconds instead of days
    await ctx.sleep(
      "wait-2-days-before-due",
      msUntilRemind / 1000 / timeFactor
    );
  }

  // Step 4: Send reminder if not returned
  try {
    await ctx.run("send-pre-due-reminder", async () => {
      const status = testMode ? "BORROWED" : await getBorrowStatus(borrowId); // Force borrowed in test
      if (status === "BORROWED") {
        await sendEmail("bookDueReminderTemplate", email, {
          fullName,
          bookTitle,
          dueDate,
        });
      }
    });
  } catch (error) {
    console.error("Failed to send pre-due reminder:", error);
  }

  // Step 5: Wait until dueDate (or reduced time in test mode)
  let msUntilDue = due.getTime() - now.getTime();
  if (testMode) msUntilDue = 5000; // 5 seconds instead of days
  if (msUntilDue > 0) {
    await ctx.sleep("wait-until-due-date", msUntilDue / 1000 / timeFactor);
  }

  // Step 6: Send due date reminder
  try {
    await ctx.run("send-due-date-reminder", async () => {
      const status = testMode ? "BORROWED" : await getBorrowStatus(borrowId); // Force borrowed in test
      if (status === "BORROWED") {
        await sendEmail("bookDueReminderTemplate", email, {
          fullName,
          bookTitle,
          dueDate,
        });
      }
    });
  } catch (error) {
    console.error("Failed to send due date reminder:", error);
  }

  // Step 7: Overdue loop (every 5 days in production, 5 seconds in test mode)
  let overdueCount = 0;
  while (overdueCount < 12) {
    overdueCount++;
    const sleepDuration = testMode ? 5 : 60 * 60 * 24 * 5; // 5s vs 5 days
    await ctx.sleep(`wait-5-days-overdue-${overdueCount}`, sleepDuration);

    let status: BorrowStatus = "BORROWED";
    if (!testMode) {
      try {
        status = await getBorrowStatus(borrowId);
      } catch (error) {
        console.error("Failed to check borrow status:", error);
      }
    }

    if (status !== "BORROWED") break;

    try {
      await ctx.run(`send-overdue-reminder-${overdueCount}`, async () => {
        await sendEmail("bookDueReminderTemplate", email, {
          fullName,
          bookTitle,
          dueDate,
          isOverdue: true,
          daysOverdue: overdueCount * 5,
        });
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
    return "BORROWED";
  }
}
