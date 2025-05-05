import { sendEmail } from "@/lib/email";
import { serve } from "@upstash/workflow/nextjs";

type RejectAccountPayload = {
  email: string;
  resetLink: string;
};

export const { POST } = serve<RejectAccountPayload>(async (context) => {
  const { resetLink, email }: RejectAccountPayload = context.requestPayload;

  await context.run("send-reset-email", async () => {
    await sendEmail("resetPasswordTemplate", email, {
      resetLink,
    });
  });
});
