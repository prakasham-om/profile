// const express = require("express");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const nodemailer = require("nodemailer");

// // Import Contact model if using MongoDB
// const Contact = require("../models/Contact");

// // Email transporter configuration
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST || "smtp.gmail.com",
//     port: process.env.EMAIL_PORT || 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.FROM_EMAIL,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false, // Accept self-signed certificates
//     },
//   });
// };

// // Validation rules
// const contactValidationRules = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 2, max: 100 })
//     .withMessage("Name must be between 2 and 100 characters")
//     .escape(),

//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Please enter a valid email address")
//     .normalizeEmail(),

//   body("subject")
//     .trim()
//     .notEmpty()
//     .withMessage("Subject is required")
//     .isLength({ min: 5, max: 200 })
//     .withMessage("Subject must be between 5 and 200 characters")
//     .escape(),

//   body("message")
//     .trim()
//     .notEmpty()
//     .withMessage("Message is required")
//     .isLength({ min: 10, max: 1000 })
//     .withMessage("Message must be between 10 and 1000 characters")
//     .escape(),
// ];

// // POST /api/contact - Create new contact message
// router.post("/", contactValidationRules, async (req, res) => {
//   try {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       });
//     }

//     const { name, email, subject, message, timestamp } = req.body;

//     console.log("📧 New contact message received:", {
//       name,
//       email,
//       subject,
//       messageLength: message.length,
//       timestamp: timestamp || new Date(),
//     });

//     // Save to MongoDB
//     const newContact = new Contact({
//       name,
//       email,
//       subject,
//       message,
//       timestamp: timestamp || new Date(),
//       ipAddress: req.ip || req.connection.remoteAddress,
//     });

//     const savedContact = await newContact.save();
//     console.log("✅ Contact saved to database:", savedContact._id);

//     // Send email notification
//     try {
//       const transporter = createTransporter();

//       // Email to you (notification)
//       const mailToYou = {
//         from: `"${process.env.FROM_NAME || "Portfolio Contact Form"}" <${
//           process.env.FROM_EMAIL
//         }>`,
//         to: process.env.TO_EMAIL,
//         subject: `Portfolio Contact: ${subject}`,
//         html: `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
//               .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
//               .field { margin-bottom: 15px; }
//               .label { font-weight: bold; color: #667eea; }
//               .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #667eea; }
//               .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h2 style="margin: 0;">🎉 New Contact Form Submission</h2>
//               </div>
//               <div class="content">
//                 <div class="field">
//                   <div class="label">👤 Name:</div>
//                   <div class="value">${name}</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">📧 Email:</div>
//                   <div class="value"><a href="mailto:${email}">${email}</a></div>
//                 </div>
//                 <div class="field">
//                   <div class="label">📝 Subject:</div>
//                   <div class="value">${subject}</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">💬 Message:</div>
//                   <div class="value">${message.replace(/\n/g, "<br>")}</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">🕐 Time:</div>
//                   <div class="value">${new Date().toLocaleString("en-IN", {
//                     timeZone: "Asia/Kolkata",
//                   })}</div>
//                 </div>
//                 <div class="field">
//                   <div class="label">🌐 IP Address:</div>
//                   <div class="value">${req.ip || "Unknown"}</div>
//                 </div>
//               </div>
//               <div class="footer">
//                 <p>This email was sent from your portfolio contact form</p>
//                 <p>Database ID: ${savedContact._id}</p>
//               </div>
//             </div>
//           </body>
//           </html>
//         `,
//       };

//       // Auto-reply email to sender
//       const mailToSender = {
//         from: `"${process.env.FROM_NAME || "Prashant Iyer"}" <${
//           process.env.FROM_EMAIL
//         }>`,
//         to: email,
//         subject: `Thank you for contacting me - ${subject}`,
//         html: `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
//               .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
//               .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
//               .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
//               .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h1 style="margin: 0;">Thank You for Reaching Out! 🙏</h1>
//               </div>
//               <div class="content">
//                 <p>Hi <strong>${name}</strong>,</p>
//                 <p>Thank you for contacting me through my portfolio! I have received your message and will get back to you as soon as possible.</p>
                
//                 <div class="message-box">
//                   <p><strong>Your Message Summary:</strong></p>
//                   <p><strong>Subject:</strong> ${subject}</p>
//                   <p><strong>Message:</strong><br>${message.replace(
//                     /\n/g,
//                     "<br>"
//                   )}</p>
//                 </div>

//                 <p>I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out directly at:</p>
//                 <ul>
//                   <li>📧 Email: ${process.env.TO_EMAIL}</li>
//                   <li>📱 Phone: +91-7303789658</li>
//                 </ul>

//                 <p>Looking forward to connecting with you!</p>
                
//                 <p>Best regards,<br>
//                 <strong>Prashant Natarajan Iyer</strong><br>
//                 Full Stack Developer</p>

//                 <a href="${
//                   process.env.FRONTEND_URL || "http://localhost:3001"
//                 }" class="button">Visit My Portfolio</a>
//               </div>
//               <div class="footer">
//                 <p>This is an automated response to confirm we received your message.</p>
//                 <p>© ${new Date().getFullYear()} Prashant Iyer. All rights reserved.</p>
//               </div>
//             </div>
//           </body>
//           </html>
//         `,
//       };

//       // Send both emails
//       await transporter.sendMail(mailToYou);
//       console.log("✅ Notification email sent to:", process.env.TO_EMAIL);

//       await transporter.sendMail(mailToSender);
//       console.log("✅ Auto-reply email sent to:", email);
//     } catch (emailError) {
//       console.error("❌ Email sending error:", emailError);
//       // Don't fail the request if email fails, just log it
//       // The message is already saved to database
//     }

//     // Return success response
//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully! I will get back to you soon.",
//       data: {
//         name,
//         email,
//         subject,
//         receivedAt: new Date().toISOString(),
//       },
//     });
//   } catch (error) {
//     console.error("❌ Contact API Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send message. Please try again later.",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// });

// // Other routes remain the same...
// // (GET, PUT, DELETE routes)

// module.exports = router;
// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  sendOtp,
  verifyOtpBeforeSubmit,
  sendMessage,
  getMessages,
  getMessageById,
  markAsRead,
  replyToMessage,
  deleteMessage,
  getMessageStats,
} = require("../controllers/contactController");

// Validation rules for sending message
const contactValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
  body("subject").trim().notEmpty().withMessage("Subject is required").isLength({ min: 5, max: 200 }).withMessage("Subject must be between 5 and 200 characters"),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ min: 10, max: 1000 }).withMessage("Message must be between 10 and 1000 characters"),
];

// ------------------- Public Routes -------------------

// Send OTP to email
router.post("/otp", sendOtp);

// Send contact form message (verify OTP before sending)
router.post("/send", contactValidationRules, verifyOtpBeforeSubmit);
router.post("/",contactValidationRules,sendMessage);

// ------------------- Admin Routes -------------------

// Get all messages with pagination/filtering
router.get("/", getMessages);

// Get message by ID
router.get("/:id", getMessageById);

// Mark message as read
router.put("/:id/read", markAsRead);

// Reply to a message
router.post("/:id/reply", replyToMessage);

// Delete a message
router.delete("/:id", deleteMessage);

// Get message stats/overview
router.get("/stats/overview", getMessageStats);

module.exports = router;
