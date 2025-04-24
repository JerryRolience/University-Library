import { sendEmail } from "@/lib/email";
import { serve } from "@upstash/workflow/nextjs";

type RejectAccountPayload = {
  email: string;
  fullName: string;
};

export const { POST } = serve<RejectAccountPayload>(async (context) => {
  const { fullName, email }: RejectAccountPayload = context.requestPayload;

  try {
    await context.run("send-reject-account-confirmation", async () => {
      await sendEmail("accountRejectionTemplate", email, {
        fullName,
      });
    });
  } catch (error) {
    console.error("Failed to send reject account confirmation:", error);
  }
});
