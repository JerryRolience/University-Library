import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/email/send-email";
import { fetchRequest } from "@/lib/api";

type UserState = "non-active" | "inactive" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // 1. Send welcome email immediately
  await context.run("new-signup", async () => {
    await sendEmail("welcome", email, { fullName });
  });

  // 2. Wait 3 days before checking activity
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  // 3. Continuous monitoring
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return determineUserState(email); // Implement your state logic
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("inactive", email, { fullName });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("newsletter", email, { fullName });
        await sendEmail("active", email, { fullName });
      });
    }

    // 4. Wait 1 month between checks
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

async function determineUserState(email: string): Promise<UserState> {
  try {
    const response = await fetchRequest(
      `${process.env.NEXT_PUBLIC_API}/user/get-user-state`,
      "POST",
      { email }
    );

    if (!response.ok) {
      throw new Error("Failed to determine user state");
    }

    return response.data.state;
  } catch (error) {
    console.error("Failed to determine user state:", error);
    return "non-active";
  }
}
