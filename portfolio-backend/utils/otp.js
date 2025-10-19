const Otp = require("../models/OtpSchema");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const createOtp = async (email) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await Otp.deleteMany({ email });
  const otpDoc = new Otp({ email, otp, expiresAt });
  await otpDoc.save();

    console.log("Created OTP for email:", email, "OTP:", otp); // Debug log
  return otp;
};

const verifyOtp = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });
  console.log("Verifying OTP for email:", email, "with OTP:", otp ,record); // Debug log
  if (!record) return { success: false, message: "Invalid OTP" };
  if (record.expiresAt < new Date()) return { success: false, message: "OTP expired" };
  await Otp.deleteOne({ _id: record._id });
  return { success: true, message: "OTP verified" };
};


module.exports = { createOtp, verifyOtp };
