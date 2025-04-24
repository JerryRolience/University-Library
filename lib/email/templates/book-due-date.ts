export const bookDueDateReminderTemplate = (
  name: string,
  bookTitle: string,
  dueDate: string,
  renewUrl: string
) => ({
  subject: `📅 Today's the Day: Return "${bookTitle}"`,
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
          background-color: #FEF3C7;
          border-left: 4px solid #F59E0B;
          padding: 16px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .urgent {
          color: #B45309;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">BookWise</div>
        <h2>Return "${bookTitle}" Today</h2>
      </div>
      
      <p>Hi ${name},</p>
      
      <div class="reminder-box">
        <p><span class="urgent">Today is the due date</span> for <span class="highlight">${bookTitle}</span>.</p>
        <p>Please return it by end of day to avoid late fees.</p>
      </div>
      
      <p style="text-align: center;">Still reading? Renew before midnight:</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${renewUrl}" class="button">Renew Now</a>
      </div>
      
      <p>Thank you!<br>The BookWise Team</p>
      
      <div class="footer">
        © ${new Date().getFullYear()} BookWise. All rights reserved.
      </div>
    </body>
    </html>
  `,
  text: `BookWise Due Today\n\nHi ${name},\n\n"${bookTitle}" is due TODAY (${dueDate}). Please return or renew:\n${renewUrl}\n\nAvoid late fees!\nThe BookWise Team`,
});
