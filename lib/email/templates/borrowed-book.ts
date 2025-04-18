export const bookBorrowedTemplate = (
  name: string,
  bookTitle: string,
  borrowDate: string,
  dueDate: string,
  borrowedBooksUrl: string
) => ({
  subject: `You've Borrowed ${bookTitle} from BookWise!`,
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
          .details {
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
          .divider {
            border-top: 1px solid #E5E7EB;
            margin: 25px 0;
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
          <h2>You've Borrowed a Book!</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>You've successfully borrowed <strong>${bookTitle}</strong>. Here are the details:</p>
        
        <div class="details">
          <div class="detail-item">
            <span class="detail-label">Borrowed On:</span> ${borrowDate}
          </div>
          <div class="detail-item">
            <span class="detail-label">Due Date:</span> ${dueDate}
          </div>
        </div>
        
        <p>Enjoy your reading, and don't forget to return the book on time!</p>
        
        <div class="divider"></div>
        
        <div class="button-container">
          <a href="${borrowedBooksUrl}" class="button">View Borrowed Books</a>
        </div>
        
        <p>Happy reading,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Book Borrowed Confirmation
      
      Hi ${name},
      
      You've successfully borrowed ${bookTitle}. Here are the details:
      
      Borrowed On: ${borrowDate}
      Due Date: ${dueDate}
      
      Enjoy your reading, and don't forget to return the book on time!
      
      View Borrowed Books: ${borrowedBooksUrl}
      
      Happy reading,
      The BookWise Team
    `,
});
