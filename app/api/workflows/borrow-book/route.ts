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
};

type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE" | "NOT_FOUND";

export const { POST } = serve<BorrowPayload>(async (ctx) => {
  const { email, fullName, bookTitle, borrowDate, dueDate, borrowId } =
    ctx.requestPayload;

  // Step 1: Send email immediately
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

  const due = await ctx.run("parse-due-date", () => new Date(dueDate));
  const now = await ctx.run("get-now", () => new Date());
  const remindDate = await ctx.run("get-remind-date", () => subDays(due, 2));

  // Step 2: Wait until 2 days before dueDate
  if (isBefore(now, remindDate)) {
    const msUntilRemind = remindDate.getTime() - now.getTime();
    await ctx.sleep("wait-2-days-before-due", (msUntilRemind + 5000) / 1000);
  }

  // Step 3: Send reminder if not returned
  try {
    await ctx.run("send-pre-due-reminder", async () => {
      const status = await getBorrowStatus(borrowId);
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

  // Step 4: Wait until exact dueDate
  const msUntilDue = due.getTime() - now.getTime();
  if (msUntilDue > 0) {
    await ctx.sleep("wait-until-due-date", (msUntilDue + 5000) / 1000);
  }

  // Step 5: Send due date reminder
  try {
    await ctx.run("send-due-date-reminder", async () => {
      const status = await getBorrowStatus(borrowId);
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

  // Step 6: Post-due reminder loop (every 5 days)
  let overdueCount = 0;
  while (true) {
    overdueCount++;
    await ctx.sleep(`wait-5-days-overdue-${overdueCount}`, 60 * 60 * 24 * 5);

    let status: BorrowStatus = "BORROWED";
    try {
      status = await getBorrowStatus(borrowId);
    } catch (error) {
      console.error("Failed to check borrow status:", error);
    }

    if (status !== "BORROWED") {
      break;
    }

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

    if (overdueCount >= 12) break;
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
