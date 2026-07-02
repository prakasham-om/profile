/**
 * Professional HTML email templates
 * Inline-safe styles for broad client support
 */
const baseStyles = {
  wrapper: "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;",
  card: "background: #fff; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);",
  heading: "font-size: 20px; font-weight: 600; color: #111; margin: 0 0 16px 0;",
  text: "margin: 0 0 12px 0;",
  code: "background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 12px 16px; font-size: 24px; font-weight: 600; letter-spacing: 4px; display: inline-block; margin: 16px 0;",
  footer: "margin-top: 24px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 13px; color: #71717a;",
  label: "font-weight: 600; color: #52525b;",
  meta: "font-size: 12px; color: #a1a1aa; margin-top: 16px;",
};

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * OTP verification email
 */
function getOtpEmailHtml({ name, otp, fromName }) {
  const n = escapeHtml(name || "there");
  const o = escapeHtml(otp);
  const f = escapeHtml(fromName);
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding: 24px; background: #fafafa;">
  <div style="${baseStyles.wrapper}">
    <div style="${baseStyles.card}">
      <h1 style="${baseStyles.heading}">Verification code</h1>
      <p style="${baseStyles.text}">Hi ${n},</p>
      <p style="${baseStyles.text}">Use this code to verify your request. It expires in 5 minutes.</p>
      <div style="${baseStyles.code}">${o}</div>
      <p style="${baseStyles.text}">If you didn't request this code, you can ignore this email.</p>
      <p style="${baseStyles.footer}">— ${f}</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * New contact form message – notification to admin
 */
function getContactNotificationHtml({ name, email, message, ipAddress, userAgent }) {
  const n = escapeHtml(name);
  const e = escapeHtml(email);
  const m = escapeHtml(message).replace(/\n/g, "<br>");
  const ip = escapeHtml(ipAddress || "");
  const ua = escapeHtml((userAgent || "").substring(0, 200));
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding: 24px; background: #fafafa;">
  <div style="${baseStyles.wrapper}">
    <div style="${baseStyles.card}">
      <h1 style="${baseStyles.heading}">New contact form message</h1>
      <p style="${baseStyles.text}"><span style="${baseStyles.label}">Name:</span> ${n}</p>
      <p style="${baseStyles.text}"><span style="${baseStyles.label}">Email:</span> <a href="mailto:${e}">${e}</a></p>
      <p style="${baseStyles.text}"><span style="${baseStyles.label}">Message:</span></p>
      <p style="${baseStyles.text}; white-space: pre-wrap;">${m}</p>
      <p style="${baseStyles.meta}">IP: ${ip}<br>User-Agent: ${ua}</p>
      <p style="${baseStyles.footer}">You can reply directly to this email to respond to the sender.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Auto-reply to sender after they submit the contact form
 */
function getAutoReplyHtml({ name, fromName }) {
  const n = escapeHtml(name);
  const f = escapeHtml(fromName);
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding: 24px; background: #fafafa;">
  <div style="${baseStyles.wrapper}">
    <div style="${baseStyles.card}">
      <h1 style="${baseStyles.heading}">We received your message</h1>
      <p style="${baseStyles.text}">Hi ${n},</p>
      <p style="${baseStyles.text}">Thank you for reaching out. We'll get back to you as soon as we can.</p>
      <p style="${baseStyles.footer}">— ${f}</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Reply from admin to the original sender
 */
function getReplyToUserHtml({ replyMessage }) {
  const m = escapeHtml(replyMessage).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding: 24px; background: #fafafa;">
  <div style="${baseStyles.wrapper}">
    <div style="${baseStyles.card}">
      <h1 style="${baseStyles.heading}">Reply to your message</h1>
      <div style="${baseStyles.text}">${m}</div>
    </div>
  </div>
</body>
</html>`;
}

module.exports = {
  getOtpEmailHtml,
  getContactNotificationHtml,
  getAutoReplyHtml,
  getReplyToUserHtml,
};
