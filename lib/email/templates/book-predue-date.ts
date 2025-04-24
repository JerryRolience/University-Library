export const bookPreDueReminderTemplate = (
  name: string,
  bookTitle: string,
  dueDate: string,
  renewUrl: string
) => ({
  subject: `⏰ Friendly Reminder: "${bookTitle}" Due Soon (${dueDate})`,
  html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 25px;
          }
          .logo {
            color: #4F46E5;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          h2 {
            color: #111827;
            font-size: 20px;
            margin-bottom: 15px;
          }
          .reminder-box {
            background-color: #F0F9FF;
            border-left: 4px solid #3B82F6;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #6B7280;
            text-align: center;
          }
          .highlight {
            font-weight: 600;
            color: #111827;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BookWise</div>
          <h2>Friendly Reminder: "${bookTitle}" Due Soon</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <div class="reminder-box">
          <p>Just a heads up that <span class="highlight">${bookTitle}</span> will be due in <strong>2 days</strong> on <span class="highlight">${dueDate}</span>.</p>
          <p>We hope you're enjoying the book!</p>
        </div>
        
        <p style="text-align: center;">Need more time? You can renew it now:</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <a href="${renewUrl}" class="button">Renew for 7 More Days</a>
        </div>
        
        <p>Happy reading!<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
    BookWise - Book Due Reminder
    
    Hi ${name},
    
    Reminder: ${bookTitle} is due for return on ${dueDate}.
    Kindly return it on time to avoid late fees.
    
    If you're still reading, you can renew the book in your account:
    ${renewUrl}
    
    Keep reading,
    The BookWise Team
  `,
});
