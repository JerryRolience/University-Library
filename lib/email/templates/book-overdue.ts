export const bookOverdueTemplate = (
  name: string,
  bookTitle: string,
  dueDate: string,
  daysOverdue: number,
  renewUrl: string
) => ({
  subject: `❗ Overdue: "${bookTitle}" (${daysOverdue} day${daysOverdue > 1 ? "s" : ""} late)`,
  html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
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
          h2 {
            color: #111827;
            font-size: 22px;
            margin-bottom: 20px;
            text-align: center;
          }
          p {
            margin-bottom: 20px;
            font-size: 16px;
            text-align: center;
          }
          .highlight {
            font-weight: 600;
            color: #111827;
          }
          .button-container {
            text-align: center;
            margin: 25px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            font-size: 16px;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #6B7280;
            text-align: center;
          }
          .reminder-box {
            background-color: #FEE2E2;
            border-left: 4px solid #DC2626;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .urgent {
            color: #DC2626;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BookWise</div>
          <h2>Overdue: "${bookTitle}"</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <div class="reminder-box">
          <p><span class="urgent">Overdue ${daysOverdue} day${daysOverdue > 1 ? "s" : ""}:</span> <span class="highlight">${bookTitle}</span> was due on ${dueDate}.</p>
          <p>Late fees will apply if not returned soon.</p>
        </div>
        
        <p style="text-align: center;">Please return immediately or renew online:</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <a href="${renewUrl}" class="button">Renew & Pay Fees</a>
        </div>
        
        <p>Questions? Reply to this email.<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `BookWise Overdue Notice\n\nHi ${name},\n\n"${bookTitle}" is ${daysOverdue} day${daysOverdue > 1 ? "s" : ""} overdue (due ${dueDate}).\n\nLate fees apply. Renew here: ${renewUrl}\n\nThe BookWise Team`,
});
