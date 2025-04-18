export const accountApprovalTemplate = (name: string, loginUrl: string) => ({
  subject: "Your BookWise Account Has Been Approved!",
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
          <h2>Your BookWise Account Has Been Approved!</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account.</p>
        
        <div class="button-container">
          <a href="${loginUrl}" class="button">Log in to BookWise</a>
        </div>
        
        <p>Welcome aboard,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Account Approved!
      
      Hi ${name},
      
      Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account.
      
      Log in to get started: ${loginUrl}
      
      Welcome aboard,
      The BookWise Team
    `,
});
