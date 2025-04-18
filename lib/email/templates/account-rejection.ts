export const accountRejectionTemplate = (
  name: string,
  reuploadUrl: string
) => ({
  subject: "Your BookWise Account Application Status",
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
          }
          .alert-box {
            background-color: #FEF2F2;
            border-left: 4px solid #DC2626;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .alert-title {
            color: #DC2626;
            font-weight: 600;
            margin-bottom: 8px;
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
          <h2>Account Application Update</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>Thank you for applying for a BookWise account. After careful review, we're unable to approve your application at this time.</p>
        
        <div class="alert-box">
          <div class="alert-title">Reason for Rejection</div>
          <p>The university ID card you submitted doesn't appear to be genuine or couldn't be verified. This may be due to:</p>
          <ul>
            <li>Blurry or unclear image</li>
            <li>Missing or obscured security features</li>
            <li>Information that doesn't match our records</li>
          </ul>
        </div>
        
        <p>If you believe this was a mistake, you may reapply by uploading a new, clear photo of your valid university ID card.</p>
        
        <div class="button-container">
          <a href="${reuploadUrl}" class="button">Upload New ID Card</a>
        </div>
        
        <p>Please ensure your new submission:</p>
        <ul>
          <li>Shows the full document without cropping</li>
          <li>Is clearly legible in good lighting</li>
          <li>Includes all security features</li>
          <li>Matches your registration information</li>
        </ul>
        
        <p>We appreciate your understanding and hope to welcome you to BookWise soon.</p>
        
        <p>Sincerely,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Account Application Status
      
      Hi ${name},
      
      Thank you for applying for a BookWise account. After careful review, we're unable to approve your application at this time.
      
      Reason for Rejection:
      The university ID card you submitted doesn't appear to be genuine or couldn't be verified. This may be due to:
      - Blurry or unclear image
      - Missing or obscured security features
      - Information that doesn't match our records
      
      If you believe this was a mistake, you may reapply by uploading a new, clear photo of your valid university ID card:
      ${reuploadUrl}
      
      Please ensure your new submission:
      - Shows the full document without cropping
      - Is clearly legible in good lighting
      - Includes all security features
      - Matches your registration information
      
      We appreciate your understanding and hope to welcome you to BookWise soon.
      
      Sincerely,
      The BookWise Team
    `,
});
