// // app/api/workflows/email-campaign/route.ts
// import { serve } from "@upstash/workflow/nextjs";
// import { Redis } from "@upstash/redis";
// import nodemailer from "nodemailer";

// // Initialize Redis client
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// // Email transporter configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail", // or your preferred service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// type InitialData = {
//   email: string;
//   name?: string;
// };

// export const { POST } = serve<InitialData>(async (context) => {
//   const { email, name } = context.requestPayload;

//   // Initial welcome email
//   await context.run("new-signup", async () => {
//     await sendEmail({
//       to: email,
//       subject: "Welcome to Our Platform",
//       html: `<h1>Welcome${name ? `, ${name}` : ""}!</h1><p>Thanks for joining us.</p>`,
//     });

//     // Track in Redis
//     await redis.hset(`user:${email}`, {
//       signupDate: Date.now(),
//       lastEmailSent: "welcome",
//       status: "new",
//     });
//   });

//   // Wait 3 days
//   await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

//   while (true) {
//     const state = await context.run("check-user-state", async () => {
//       return await getUserState(email);
//     });

//     if (state === "non-active") {
//       await context.run("send-email-non-active", async () => {
//         await sendEmail({
//           to: email,
//           subject: "We Miss You!",
//           html: "<p>Come back and check what you are missing!</p>",
//         });
//         await redis.hset(`user:${email}`, {
//           lastEmailSent: "non-active-reminder",
//           lastReminderDate: Date.now(),
//         });
//       });
//     } else if (state === "active") {
//       await context.run("send-email-active", async () => {
//         await sendEmail({
//           to: email,
//           subject: "Your Monthly Newsletter",
//           html: "<p>Here are this month's updates...</p>",
//         });
//         await redis.hset(`user:${email}`, {
//           lastEmailSent: "newsletter",
//           lastNewsletterDate: Date.now(),
//         });
//       });
//     }

//     // Wait 1 month
//     await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
//   }
// });

// async function sendEmail({
//   to,
//   subject,
//   html,
// }: {
//   to: string;
//   subject: string;
//   html: string;
// }) {
//   try {
//     await transporter.sendMail({
//       from: `"Your Company" <${process.env.EMAIL_FROM}>`,
//       to,
//       subject,
//       html,
//     });
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     throw error;
//   }
// }

// type UserState = "non-active" | "active";

// async function getUserState(email: string): Promise<UserState> {
//   const userData = await redis.hgetall(`user:${email}`);

//   // Simple logic - modify as needed
//   const lastActive = userData?.lastActiveDate
//     ? new Date(userData.lastActiveDate).getTime()
//     : 0;

//   return Date.now() - lastActive > 30 * 24 * 60 * 60 * 1000
//     ? "non-active"
//     : "active";
// }
