export const bookDueReminderTemplate = (
  name: string,
  bookTitle: string,
  dueDate: string,
  renewUrl: string
) => ({
  subject: `Reminder: ${bookTitle} is Due Soon!`,
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
          .reminder-box {
            background-color: #F0FDF4;
            border-left: 4px solid #16A34A;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
            text-align: center;
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
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BookWise</div>
          <h2>Reminder: ${bookTitle} is Due Soon!</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <div class="reminder-box">
          <p>Just a reminder that <span class="highlight">${bookTitle}</span> is due for return on <span class="highlight">${dueDate}</span>.</p>
          <p>Kindly return it on time to avoid late fees.</p>
        </div>
        
        <p>If you're still reading, you can renew the book in your account.</p>
        
        <div class="button-container">
          <a href="${renewUrl}" class="button">Renew Book Now</a>
        </div>
        
        <p>Keep reading,<br>The BookWise Team</p>
        
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
