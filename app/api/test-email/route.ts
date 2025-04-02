import { sendEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sendEmail("welcome", "jerryrawlings892@gmail.com", {
      fullName: "Jerry Seinfeld",
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send test email" },
      { status: 500 }
    );
  }
}
