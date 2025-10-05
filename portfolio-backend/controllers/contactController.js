// controllers/contactController.js - Contact controller
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");
const { createOtp, verifyOtp } = require("../utils/otp");

// Helper: create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });
};



// ✅ Send OTP
// controllers/contactController.js
const sendOtp = async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  try {
    // ✅ Await the createOtp function
    const otp = await createOtp(email);

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Contact Form",
      text: `Hi ${name || ""},\n\nYour OTP is: ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP email error:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

const verifyOtpBeforeSubmit = async (req, res, next) => {
   try {
    const { email, otp } = req.body;
    const result = await verifyOtp(email, otp);
    // ✅ Send JSON response even on success
    return result.success
      ? res.status(200).json(result)
      : res.status(400).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }


};




// @desc    Send contact form message
// @route   POST /api/contact/send
// @access  Public
const sendMessage = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    // Capture extra info
    const userAgent = req.get("User-Agent") || "";
    const ipAddress = req.ip || req.connection.remoteAddress || "";
    const referrer = req.get("Referer") || "";

    // Save to DB
    const contactData = {
      ...req.body,
      userAgent,
      ipAddress,
      referrer,
    };
    const contact = new Contact(contactData);
    await contact.save();

    // ✅ Send email notification to admin
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"${req.body.name}" <${req.body.email}>`,
      to: process.env.TO_EMAIL,
      subject: `📩 New Contact Form Message from ${req.body.name}`,
      text: `
Name: ${req.body.name}
Email: ${req.body.email}
Message: ${req.body.message}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Message:</strong><br/>${req.body.message}</p>
        <hr/>
        <small>IP: ${ipAddress} | User-Agent: ${userAgent}</small>
      `,
    });

    // ✅ Optional: auto-confirmation email to the sender
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: req.body.email,
      subject: "✅ Thanks for contacting me!",
      text: `Hi ${req.body.name},\n\nThanks for reaching out! I’ll get back to you soon.\n\n— ${process.env.FROM_NAME}`,
      html: `
        <p>Hi <strong>${req.body.name}</strong>,</p>
        <p>Thanks for reaching out! I’ll get back to you soon.</p>
        <p>— ${process.env.FROM_NAME}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully. Thank you for reaching out!",
      data: {
        messageId: contact._id,
        status: contact.status,
      },
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      success: false,
      message: "Server error sending message. Please try again later.",
    });
  }
};

// @desc    Get all contact messages (admin only)
const getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "-createdAt";
    const { status, category, priority, search } = req.query;

    let query = {};
    if (status && status !== "all") query.status = status;
    if (category && category !== "all") query.category = category;
    if (priority && priority !== "all") query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    if (req.query.includeSpam !== "true") query.isSpam = false;

    const messages = await Contact.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip);
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
        filters: { status, category, priority, search },
      },
    });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching messages",
    });
  }
};

// @desc    Get single contact message
const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, data: { message } });
  } catch (error) {
    console.error("Get message by ID error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching message" });
  }
};

// @desc    Mark message as read
const markAsRead = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    await message.markAsRead();
    res.json({
      success: true,
      message: "Message marked as read",
      data: { message: message.getPublicData() },
    });
  } catch (error) {
    console.error("Mark as read error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error marking as read" });
  }
};

// @desc    Reply to message
const replyToMessage = async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    await message.markAsReplied(replyMessage);

    // ✅ Send reply email to user
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: message.email,
      subject: "Re: Your message to my Portfolio",
      text: replyMessage,
      html: `<p>${replyMessage}</p>`,
    });

    res.json({
      success: true,
      message: "Reply sent successfully",
      data: { message: message.getPublicData() },
    });
  } catch (error) {
    console.error("Reply to message error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error sending reply" });
  }
};

// @desc    Delete message
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error deleting message" });
  }
};

// @desc    Get message stats
const getMessageStats = async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments({ isSpam: false });
    const newMessages = await Contact.countDocuments({
      status: "New",
      isSpam: false,
    });
    const readMessages = await Contact.countDocuments({
      status: "Read",
      isSpam: false,
    });
    const repliedMessages = await Contact.countDocuments({
      status: "Replied",
      isSpam: false,
    });
    const archivedMessages = await Contact.countDocuments({
      status: "Archived",
      isSpam: false,
    });
    const spamMessages = await Contact.countDocuments({ isSpam: true });
    const highPriorityMessages = await Contact.countDocuments({
      priority: { $in: ["High", "Urgent"] },
      status: { $ne: "Archived" },
      isSpam: false,
    });

    const messagesByCategory = await Contact.aggregate([
      { $match: { isSpam: false } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentActivity = await Contact.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo }, isSpam: false } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          total: totalMessages,
          new: newMessages,
          read: readMessages,
          replied: repliedMessages,
          archived: archivedMessages,
          spam: spamMessages,
          highPriority: highPriorityMessages,
        },
        categories: messagesByCategory,
        recentActivity,
      },
    });
  } catch (error) {
    console.error("Get message stats error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching stats" });
  }
};

module.exports = {
  sendOtp, verifyOtpBeforeSubmit,
  sendMessage,
  getMessages,
  getMessageById,
  markAsRead,
  replyToMessage,
  deleteMessage,
  getMessageStats,
};
