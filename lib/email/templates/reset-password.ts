export const resetPasswordTemplate = (resetUrl: string) => ({
  subject: "Reset Your BookWise Password",
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
          .alert-box {
            background-color: #FEF2F2;
            border-left: 4px solid #DC2626;
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
          .small-text {
            font-size: 14px;
            color: #6B7280;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BookWise</div>
          <h2>Reset Your Password</h2>
        </div>
        
        <p>Hello 🖐️,</p>
        
        <div class="alert-box">
          <p>We received a request to reset your BookWise account password.</p>
        </div>
        
        <p>Click the button below to create a new password:</p>
        
        <div class="button-container">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        
        <p class="small-text">
          This link will expire in 30 minutes. If you didn't request a password reset, 
          you can safely ignore this email.
        </p>
        
        <p>Happy reading,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Password Reset
      
      Hello 🖐️,
      
      We received a request to reset your BookWise account password.
      
      Please use the following link to reset your password:
      ${resetUrl}
      
      This link will expire in 30 minutes. If you didn't request a password reset, 
      you can safely ignore this email.
      
      Happy reading,
      The BookWise Team
    `,
});
