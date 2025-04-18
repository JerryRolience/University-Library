export const activeTemplate = (name: string, discoverUrl: string) => ({
  subject: "Congratulations on Reaching a New Milestone!",
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
          .celebration-box {
            background-color: #ECFDF5;
            border-left: 4px solid #10B981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
            text-align: center;
          }
          .milestone-badge {
            font-size: 48px;
            margin-bottom: 15px;
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
          <h2>Congratulations on Reaching a New Milestone!</h2>
        </div>
        
        <p>Hi ${name},</p>
        
        <div class="celebration-box">
          <div class="milestone-badge">🎉</div>
          <p>Great news! You've reached a new milestone in your reading journey with BookWise. 🟢</p>
          <p>Whether it's finishing a challenging book, staying consistent with your reading goals, or exploring new genres, your dedication inspires us.</p>
        </div>
        
        <p>Keep the momentum going—there are more exciting books and features waiting for you!</p>
        
        <div class="button-container">
          <a href="${discoverUrl}" class="button">Discover New Reads</a>
        </div>
        
        <p>Keep the pages turning,<br>The BookWise Team</p>
        
        <div class="footer">
          © ${new Date().getFullYear()} BookWise. All rights reserved.
        </div>
      </body>
      </html>
    `,
  text: `
      BookWise - Milestone Achievement!
      
      Hi ${name},
      
      Congratulations on reaching a new milestone in your reading journey with BookWise! 🎉
      
      Whether it's finishing a challenging book, staying consistent with your reading goals, 
      or exploring new genres, your dedication inspires us.
      
      Keep the momentum going—there are more exciting books and features waiting for you!
      
      Discover new reads: ${discoverUrl}
      
      Keep the pages turning,
      The BookWise Team
    `,
});
