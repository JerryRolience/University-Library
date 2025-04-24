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
  debug?: boolean; // 👈 optional debug flag
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
    debug = true,
  } = ctx.requestPayload;

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

  const due = await ctx.run("parse-due-date", () => new Date(dueDate));
  const now = await ctx.run("get-now", () => new Date());
  const remindDate = await ctx.run("get-remind-date", () => subDays(due, 2));

  // Step 2: Wait until 2 days before dueDate
  if (isBefore(now, remindDate)) {
    const msUntilRemind = remindDate.getTime() - now.getTime();
    const sleepTime = debug ? 5 : (msUntilRemind + 5000) / 1000;
    await ctx.sleep("wait-2-days-before-due", sleepTime);
  }

  // Step 3: Send 2-days-before reminder
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

  // Step 4: Wait until dueDate
  const msUntilDue = due.getTime() - now.getTime();
  if (msUntilDue > 0) {
    const sleepTime = debug ? 5 : (msUntilDue + 5000) / 1000;
    await ctx.sleep("wait-until-due-date", sleepTime);
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

  // Step 6: Every-5-days overdue loop
  let overdueCount = 0;
  while (true) {
    overdueCount++;
    await ctx.sleep(
      `wait-5-days-overdue-${overdueCount}`,
      debug ? 5 : 60 * 60 * 24 * 5
    );

    let status: BorrowStatus = "BORROWED";
    try {
      status = await getBorrowStatus(borrowId);
    } catch (error) {
      console.error("Failed to check borrow status:", error);
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
