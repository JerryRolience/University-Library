import { sendEmail } from "@/lib/email";
import { serve } from "@upstash/workflow/nextjs";

type ReturnPayload = {
  email: string;
  fullName: string;
  bookTittle: string;
};

export const { POST } = serve<ReturnPayload>(async (context) => {
  const { bookTittle, fullName, email }: ReturnPayload = context.requestPayload;

  try {
    await context.run("send-return-confirmation", async () => {
      await sendEmail("bookReturnConfirmationTemplate", email, {
        fullName,
        bookTittle,
      });
    });
  } catch (error) {
    console.error("Failed to send return book confirmation:", error);
  }
});
