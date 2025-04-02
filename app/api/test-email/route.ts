import { sendEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await sendEmail("welcome", "jerryrawlings892@gmail.com", {
      fullName: "Jerry Seinfeld",
    });
    return NextResponse.json({ success: true, response });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Failed to send test email" },
      { status: 500 }
    );
  }
}
