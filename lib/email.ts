import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "Gmail",
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
});

const TEMPLATES = {
  welcome: (name: string) => ({
    subject: "Welcome to Our Platform",
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining our platform.</p>
    `,
  }),
  inactive: (name: string) => ({
    subject: "We Miss You!",
    html: `
      <h2>Come back to your account</h2>
      <p>You've been inactive for a while.</p>
    `,
  }),
  active: (name: string) => ({
    subject: "Welcome Back!",
    html: `
      <h2>Welcome back to our platform, ${name}!</h2>
      <p>Here's what's new since you last visited.</p>
    `,
  }),
  newsletter: (name: string) => ({
    subject: "Monthly Newsletter",
    html: `
      <h2>Here's what's new this month</h2>
      <!-- Newsletter content -->
    `,
  }),
};

export async function sendEmail(
  type: keyof typeof TEMPLATES,
  email: string,
  data: any = {}
) {
  const template =
    typeof TEMPLATES[type] === "function"
      ? TEMPLATES[type](data.fullName || "User")
      : TEMPLATES[type];

  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: template.subject,
    html: template.html,
    headers: {
      "X-Entity-Ref-ID": Date.now().toString(), // helps with tracking
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent ${type} email to ${email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send ${type} email to ${email}:`, error);
    throw error;
  }
}
