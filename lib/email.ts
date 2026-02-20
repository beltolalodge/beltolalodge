import nodemailer from 'nodemailer';

const isEmailEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';

let transporter: nodemailer.Transporter | null = null;

if (isEmailEnabled) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail(to: string, subject: string, html: string) {
  if (!isEmailEnabled || !transporter) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Email Disabled/Mock] To: ${to}, Subject: ${subject}`);
    }
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export const emailTemplates = {
  bookingReceived: (name: string, bookingId: string) => `
    <h1>Booking Received</h1>
    <p>Dear ${name},</p>
    <p>We have received your request (ID: ${bookingId}).</p>
  `,
  // ... other templates
};
