export const bookReturnConfirmationTemplate = (
  name: string,
  bookTitle: string,
  exploreUrl: string
) => ({
  subject: `Thank You for Returning ${bookTitle}`,
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
          .confirmation-box {
            background-color: #F0FDF4;
            border-left: 4px solid #16A34A;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
            text-align: center;
          }
          .book-title {
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
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BookWise</div>
          <h2>Thank You for Returning ${bookTitle}</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <div class="confirmation-box">
          <p>We've successfully received your return of <span class="book-title">${bookTitle}</span>.</p>
          <p>Thank you for returning it on time.</p>
        </div>
        
        <p>Looking for your next read? Browse our collection and borrow your next favorite book!</p>
        
        <div class="button-container">
          <a href="${exploreUrl}" class="button">Explore New Books</a>
        </div>
        
        <p>Happy exploring,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Return Confirmation
      
      Hi ${name},
      
      We've successfully received your return of ${bookTitle}.
      Thank you for returning it on time.
      
      Looking for your next read? Browse our collection:
      ${exploreUrl}
      
      Happy exploring,
      The BookWise Team
    `,
});
