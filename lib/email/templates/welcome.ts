export const welcomeTemplate = (name: string, loginUrl: string) => ({
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
          .header { text-align: center; margin-bottom: 30px; }
          .logo {
            color: #4F46E5;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          h1 { color: #111827; font-size: 24px; margin-bottom: 20px; }
          p { margin-bottom: 20px; font-size: 16px; }
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
        <p>Welcome to BookWise! We're excited to have you join our community of book enthusiasts.</p>
        <p>Get started by logging in:</p>
        <div style="text-align: center;">
          <a href="${loginUrl}" class="button">Login to BookWise</a>
        </div>
        <p>Happy reading,<br>The BookWise Team</p>
        <div class="footer">© ${new Date().getFullYear()} BookWise. All rights reserved.</div>
      </body>
      </html>
    `,
  text: `
      Welcome to BookWise, ${name}!
  
      Hi ${name},
  
      Welcome to BookWise! Explore a wide range of books and manage your reading journey.
  
      Login: ${loginUrl}
  
      Happy reading,
      The BookWise Team
    `,
});
