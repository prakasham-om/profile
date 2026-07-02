/**
 * Email service – SMTP transporter and send helpers
 * Uses config from config/email.js (works with any free SMTP provider)
 */
const nodemailer = require("nodemailer");
const emailConfig = require("../config/email");
const { getOtpEmailHtml, getContactNotificationHtml, getAutoReplyHtml, getReplyToUserHtml } = require("./emailTemplates");

let transporter = null;

/**
 * Get or create nodemailer transporter (singleton)
 */
function getTransporter() {
  if (transporter) return transporter;
  const { smtp } = emailConfig;
  if (!smtp.auth?.user || !smtp.auth?.pass) {
    throw new Error("SMTP credentials missing. Set SMTP_USER and SMTP_PASS (or EMAIL_USER / EMAIL_PASS) in .env");
  }
  transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
    connectionTimeout: smtp.connectionTimeout,
    greetingTimeout: smtp.greetingTimeout,
    socketTimeout: smtp.socketTimeout,
    tls: smtp.tls,
  });
  return transporter;
}

/**
 * Send OTP email
 */
async function sendOtpEmail({ to, name, otp }) {
  const from = `"${emailConfig.from.name}" <${emailConfig.from.email}>`;
  const subject = "Your verification code";
  const text = `Hi ${name || "there"},\n\nYour verification code is: ${otp}. It expires in 5 minutes.\n\n— ${emailConfig.from.name}`;
  const html = getOtpEmailHtml({ name, otp, fromName: emailConfig.from.name });

  await getTransporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

/**
 * Send contact form notification to admin
 */
async function sendContactNotificationToAdmin({ name, email, message, ipAddress, userAgent }) {
  const to = emailConfig.to.admin;
  if (!to) return; // optional: skip if TO_EMAIL not set
  const from = `"${emailConfig.from.name}" <${emailConfig.from.email}>`;
  const subject = `New message from ${name} via Contact Form`;
  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nIP: ${ipAddress}`;
  const html = getContactNotificationHtml({ name, email, message, ipAddress, userAgent });

  await getTransporter().sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  });
}

/**
 * Send auto-reply to the person who submitted the contact form
 */
async function sendAutoReplyToSender({ to, name }) {
  const from = `"${emailConfig.from.name}" <${emailConfig.from.email}>`;
  const subject = "We received your message";
  const text = `Hi ${name},\n\nThank you for reaching out. We'll get back to you soon.\n\n— ${emailConfig.from.name}`;
  const html = getAutoReplyHtml({ name, fromName: emailConfig.from.name });

  await getTransporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

/**
 * Send reply from admin to the original sender
 */
async function sendReplyToUser({ to, replyMessage }) {
  const from = `"${emailConfig.from.name}" <${emailConfig.from.email}>`;
  const subject = "Re: Your message";
  const text = replyMessage;
  const html = getReplyToUserHtml({ replyMessage });

  await getTransporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

module.exports = {
  getTransporter,
  sendOtpEmail,
  sendContactNotificationToAdmin,
  sendAutoReplyToSender,
  sendReplyToUser,
};
