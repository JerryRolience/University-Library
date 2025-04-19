import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/email/send-email";
import { fetchRequest } from "@/lib/api";
import { subDays, isBefore, addMilliseconds } from "date-fns";

type BorrowPayload = {
  email: string;
  fullName: string;
  bookTitle: string;
  borrowDate: string; // ISO string
  dueDate: string; // ISO string
  borrowId: string;
};

// Status values should match your BORROW_STATUS_ENUM
type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE" | "NOT_FOUND";

export const { POST } = serve<BorrowPayload>(async (ctx) => {
  const { email, fullName, bookTitle, borrowDate, dueDate, borrowId } =
    ctx.requestPayload;

  try {
    // Step 1: Send email immediately
    await ctx.run("send-borrow-confirmation", async () => {
      try {
        await sendEmail("bookBorrowedTemplate", email, {
          fullName,
          bookTitle,
          borrowDate,
          dueDate,
        });
      } catch (error) {
        console.error("Failed to send borrow confirmation:", error);
        // Consider retry logic here
      }
    });

    const due = new Date(dueDate);
    const now = new Date();

    // Step 2: Wait until 2 days before dueDate (if not already past)
    const remindDate = subDays(due, 2);
    if (isBefore(now, remindDate)) {
      const msUntilRemind = remindDate.getTime() - now.getTime();
      // Add small buffer to ensure we don't run exactly at midnight
      await ctx.sleep("wait-2-days-before-due", (msUntilRemind + 5000) / 1000);
    }

    // Step 3: Send reminder if not returned
    await ctx.run("send-pre-due-reminder", async () => {
      try {
        const status = await getBorrowStatus(borrowId);
        if (status === "BORROWED") {
          await sendEmail("bookDueReminderTemplate", email, {
            fullName,
            bookTitle,
            dueDate,
          });
        }
      } catch (error) {
        console.error("Failed to send pre-due reminder:", error);
      }
    });

    // Step 4: Wait until exact dueDate (if not already past)
    const msUntilDue = due.getTime() - now.getTime();
    if (msUntilDue > 0) {
      // Add small buffer
      await ctx.sleep("wait-until-due-date", (msUntilDue + 5000) / 1000);
    }

    // Step 5: Due date reached reminder
    await ctx.run("send-due-date-reminder", async () => {
      try {
        const status = await getBorrowStatus(borrowId);
        if (status === "BORROWED") {
          await sendEmail("bookDueReminderTemplate", email, {
            fullName,
            bookTitle,
            dueDate,
          });
        }
      } catch (error) {
        console.error("Failed to send due date reminder:", error);
      }
    });

    // Step 6: Post-due reminder loop (every 5 days)
    let overdueCount = 0;
    while (true) {
      overdueCount++;
      await ctx.sleep(`wait-5-days-overdue-${overdueCount}`, 60 * 60 * 24 * 5);

      try {
        const status = await getBorrowStatus(borrowId);
        if (status !== "BORROWED") {
          break; // Book was returned or status changed
        }

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
        console.error(
          "Failed to check status or send overdue reminder:",
          error
        );
        // Consider breaking after several failures
        if (overdueCount > 12) break; // Stop after 12 reminders (60 days)
      }
    }
  } catch (error) {
    console.error("Workflow failed:", error);
    // Consider adding error notification here
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
