export const checkInTemplate = (name: string, loginUrl: string) => ({
  subject: "Don't Forget to Check In at BookWise",
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
            .reminder-box {
              background-color: #EFF6FF;
              border-left: 4px solid #3B82F6;
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
            <h2>Don't Forget to Check In at BookWise</h2>
          </div>
          
          <p>Hi ${name},</p>
          
          <div class="reminder-box">
            <p>We noticed you haven't checked in recently. Stay active and keep track of:</p>
            <ul style="text-align: left; display: inline-block; margin: 0; padding-left: 20px;">
              <li>Your borrowed books</li>
              <li>Upcoming due dates</li>
              <li>New arrivals</li>
            </ul>
          </div>
          
          <p>Log in now to stay on top of your reading:</p>
          
          <div class="button-container">
            <a href="${loginUrl}" class="button">Log in to BookWise</a>
          </div>
          
          <p>Keep the pages turning,<br>The BookWise Team</p>
          
          <div class="footer">
            © ${new Date().getFullYear()} BookWise. All rights reserved.
          </div>
        </body>
        </html>
      `,
  text: `
        BookWise - Check-In Reminder
        
        Hi ${name},
        
        We noticed you haven't checked in recently. Stay active and keep track of:
        - Your borrowed books
        - Upcoming due dates
        - New arrivals
        
        Log in now: ${loginUrl}
        
        Keep the pages turning,
        The BookWise Team
      `,
});
