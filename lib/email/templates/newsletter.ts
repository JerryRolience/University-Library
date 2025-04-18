import { EmailBook } from "../utils";

export default function newsletterTemplate(name: string, books: EmailBook[]) {
  const bookListHTML = books
    .map((book) => `<li>${book.title} by ${book.author}</li>`)
    .join("");

  const bookListText = books
    .map((book) => `- ${book.title} by ${book.author}`)
    .join("\n");

  return {
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
              ${bookListHTML}
            </ul>
          </div>
  
          <a href="${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
            Browse New Books
          </a>
  
          <div class="footer" style="margin-top: 30px; font-size: 14px; color: #6B7280; text-align: center;">
            © ${new Date().getFullYear()} BookWise. All rights reserved.
          </div>
        </div>
      `,
    text: `
  BookWise Monthly Newsletter - ${new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}
  
  Hi ${name},
  
  This Month's Highlights:
  ${bookListText}
  
  Browse new books: ${process.env.NEXT_PUBLIC_SITE_URL}/new-arrivals
  
  © ${new Date().getFullYear()} BookWise. All rights reserved.
      `,
  };
}
