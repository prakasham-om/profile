/**
 * Email / SMTP configuration
 * Works with any free SMTP: Brevo, Mailtrap, Elastic Email, Gmail, etc.
 */
require("dotenv").config();

const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
    // Connection timeouts
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    // TLS: use system certs; set false only for local/testing (e.g. Mailtrap)
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  },
  from: {
    name: process.env.FROM_NAME || "Portfolio",
    email: process.env.FROM_EMAIL || process.env.SMTP_USER || process.env.EMAIL_USER,
  },
  to: {
    admin: process.env.TO_EMAIL,
  },
};

module.exports = emailConfig;
