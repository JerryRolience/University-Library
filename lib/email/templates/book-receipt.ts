export const bookReceiptTemplate = (
  name: string,
  bookTitle: string,
  borrowDate: string,
  dueDate: string,
  receiptDownloadUrl: string
) => ({
  subject: `Your Receipt for ${bookTitle} is Ready!`,
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
          .receipt-details {
            background-color: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
          }
          .detail-item {
            margin-bottom: 10px;
          }
          .detail-label {
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
          <h2>Your Receipt for ${bookTitle} is Ready!</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>Your receipt for borrowing <strong>${bookTitle}</strong> has been generated. Here are the details:</p>
        
        <div class="receipt-details">
          <div class="detail-item">
            <span class="detail-label">Borrowed On:</span> ${borrowDate}
          </div>
          <div class="detail-item">
            <span class="detail-label">Due Date:</span> ${dueDate}
          </div>
        </div>
        
        <p>You can download the receipt here:</p>
        
        <div class="button-container">
          <a href="${receiptDownloadUrl}" class="button">Download Receipt</a>
        </div>
        
        <p>Keep the pages turning,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Receipt Generated
      
      Hi ${name},
      
      Your receipt for borrowing ${bookTitle} has been generated. Here are the details:
      
      Borrowed On: ${borrowDate}
      Due Date: ${dueDate}
      
      You can download the receipt here:
      ${receiptDownloadUrl}
      
      Keep the pages turning,
      The BookWise Team
    `,
});
