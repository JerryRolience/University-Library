import { sendEmail } from "@/lib/email";
import { serve } from "@upstash/workflow/nextjs";

type RejectAccountPayload = {
  email: string;
  fullName: string;
};

export const { POST } = serve<RejectAccountPayload>(async (context) => {
  const { fullName, email }: RejectAccountPayload = context.requestPayload;

  await context.run("send-accept-account-confirmation", async () => {
    await sendEmail("accountApprovalTemplate", email, {
      fullName,
    });
  });
});
