import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "Gmail",
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
});

const TEMPLATES = {
  welcome: (name: string, loginUrl: string) => ({
    subject: `Welcome to BookWise, ${name}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style type="text/css">
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            color: #4F46E5;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          h1 {
            color: #111827;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 20px;
            font-size: 16px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #6B7280;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BookWise</div>
          <h1>Welcome to BookWise, Your Reading Companion!</h1>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.</p>
        
        <p>Get started by logging in to your account:</p>
        
        <div style="text-align: center;">
          <a href="${loginUrl}" class="button">Login to BookWise</a>
        </div>
        
        <p>Happy reading,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to BookWise, ${name}!

      Hi ${name},

      Welcome to BookWise! We're excited to have you join our community of book enthusiasts. 
      Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.

      Get started by logging in to your account:
      ${loginUrl}

      Happy reading,
      The BookWise Team
    `,
  }),
  inactive: (name: string) => ({
    subject: "We Miss You!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #111827;">Come back to your account, ${name}</h2>
        <p>You've been inactive for a while. We'd love to see you back!</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/login" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">
          Return to BookWise
        </a>
      </div>
    `,
    text: `We miss you, ${name}!\n\nYou've been inactive for a while. Log in to see what's new: ${process.env.NEXT_PUBLIC_SITE_URL}/login`,
  }),
  active: (name: string) => ({
    subject: "Welcome Back!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #111827;">Welcome back to BookWise, ${name}!</h2>
        <p>Here's what's new since you last visited:</p>
        <ul>
          <li>New book arrivals in your favorite genres</li>
          <li>Updated reading recommendations</li>
          <li>Special member-only events</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">
          Explore Now
        </a>
      </div>
    `,
    text: `Welcome back, ${name}!\n\nNew updates:\n- New book arrivals\n- Reading recommendations\n- Member events\n\nVisit: ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  }),
  newsletter: (name: string) => ({
    subject: "Your Monthly BookWise Newsletter",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="color: #4F46E5; font-size: 28px; font-weight: bold; margin-bottom: 10px;">BookWise</div>
          <h1 style="color: #111827; font-size: 24px; margin-bottom: 20px;">Monthly Newsletter</h1>
        </div>
        
        <p>Hi ${name},</p>
        
        <h3 style="color: #111827;">This Month's Highlights</h3>
        <p>Here's what's new in our library this month:</p>
        
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #111827; margin-top: 0;">New Arrivals</h4>
          <ul style="padding-left: 20px;">
            <li>Book Title 1 by Author 1</li>
            <li>Book Title 2 by Author 2</li>
            <li>Book Title 3 by Author 3</li>
          </ul>
        </div>
        
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/new-arrivals" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Browse New Books
        </a>
        
        <div class="footer" style="margin-top: 30px; font-size: 14px; color: #6B7280; text-align: center;">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </div>
    `,
    text: `
      BookWise Monthly Newsletter - ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      
      Hi ${name},
      
      This Month's Highlights:
      - New Arrivals: Book Title 1, Book Title 2, Book Title 3
      
      Browse new books: ${process.env.NEXT_PUBLIC_SITE_URL}/new-arrivals
      
      © ${new Date().getFullYear()} BookWise. All rights reserved.
    `,
  }),
};

export async function sendEmail(
  type: keyof typeof TEMPLATES,
  email: string,
  data: any = {}
) {
  // Default login URL if not provided
  const loginUrl = `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}/sign-in`;

  const template =
    typeof TEMPLATES[type] === "function"
      ? TEMPLATES[type](
          data.fullName || "User",
          type === "welcome" ? loginUrl : ""
        )
      : TEMPLATES[type];

  const mailOptions = {
    from: `"BookWise" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
    headers: {
      "X-Entity-Ref-ID": Date.now().toString(),
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent ${type} email to ${email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send ${type} email to ${email}:`, error);
    throw error;
  }
}
