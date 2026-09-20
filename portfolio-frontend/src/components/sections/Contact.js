// src/components/sections/Contact.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, Mail, User, MessageSquare, Lock, Key, CheckCircle, AlertCircle, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { ANIMATION_VARIANTS } from "../../utils/constants";
import { validateEmail } from "../../utils/helpers";
import Button from "../ui/Button";
import { contactAPI } from "../../services/api";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";

// OTP INPUT COMPONENT - Mobile optimized
const OtpInput = ({ value, setValue }) => {
  const handleInput = (digit, index) => {
    if (!/^[0-9]?$/.test(digit)) return;
    let arr = value.split("");
    arr[index] = digit;
    const newOtp = arr.join("");
    setValue(newOtp);
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^[0-9]+$/.test(pastedData)) {
      setValue(pastedData);
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array(6).fill("").map((_, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInput(e.target.value, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          onPaste={handlePaste}
          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-white bg-gray-800/50 border-2 border-gray-600 rounded-xl text-lg sm:text-xl font-mono focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    if (name === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setOtpError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setOtpError("Please enter a valid email");
      return;
    }
    try {
      setOtpLoading(true);
      const res = await contactAPI.sendOtp({ email: formData.email, name: formData.name });
      if (res.success) {
        setOtpSent(true);
        setOtpError("");
      } else setOtpError(res.message || "Failed to send OTP");
    } catch {
      setOtpError("Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtpHandler = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Enter 6-digit OTP");
      return;
    }
    try {
      setOtpLoading(true);
      const res = await contactAPI.verifyOtp({ email: formData.email, otp });
      if (res.success) {
        setOtpVerified(true);
        setOtpError("");
      } else setOtpError(res.message || "OTP verification failed");
    } catch {
      setOtpError("OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!otpVerified) {
      setOtpError("Verify your email first");
      return;
    }
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await contactAPI.sendMessage(formData);
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setOtpSent(false);
        setOtp("");
        setOtpVerified(false);
        setOtpError("");
      } else setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header - Mobile optimized */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-green-500/10 border border-green-400/20 font-mono text-xs sm:text-sm text-green-400 mb-3 sm:mb-4">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>$ contact --connect</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Have a project in mind? Let's discuss and build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Contact Info - Left Side - Mobile optimized */}
          <motion.div
            className="lg:col-span-2 space-y-4 sm:space-y-6"
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-500/10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-green-500/10 border border-green-400/20 flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-green-400 transition-colors text-sm sm:text-base break-all">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs sm:text-sm">Location</p>
                    <p className="text-white text-sm sm:text-base">{PERSONAL_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-purple-500/10 border border-purple-400/20 flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs sm:text-sm">Phone</p>
                    <p className="text-white text-sm sm:text-base">{PERSONAL_INFO.phone}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700/50">
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Connect with me</p>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-green-400/50 hover:bg-green-500/10 transition-all"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-400/50 hover:bg-green-500/10 transition-all"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Status Card - Mobile optimized */}
            <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-2xl p-4 sm:p-6 border border-green-400/20">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-ping opacity-75"></span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Available for work</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Open to opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Right Side - Mobile optimized */}
          <motion.div
            className="lg:col-span-3"
            variants={ANIMATION_VARIANTS.fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-green-500/10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Send a Message</h3>

              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-800/50 border rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.name ? "border-red-500/50" : "border-gray-700 focus:border-green-500"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-800/50 border rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.email || otpError ? "border-red-500/50" : "border-gray-700 focus:border-green-500"
                    }`}
                  />
                </div>
                {(errors.email || otpError) && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email || otpError}
                  </p>
                )}
              </div>

              {/* OTP Section - Mobile optimized */}
              {!otpVerified && !otpSent && validateEmail(formData.email) && (
                <div className="mb-4">
                  <button
                    onClick={sendOtp}
                    disabled={otpLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-500/10 border border-green-400/20 rounded-xl text-green-400 hover:bg-green-500/20 transition-all text-sm sm:text-base font-medium"
                  >
                    <Lock className="w-4 h-4" />
                    {otpLoading ? "Sending..." : "Send Verification OTP"}
                  </button>
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="mb-4 p-3 sm:p-4 bg-green-500/5 rounded-xl border border-green-400/20">
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 text-center">
                    Enter the 6-digit OTP sent to your email
                  </p>
                  <OtpInput value={otp} setValue={setOtp} />
                  {otpError && (
                    <p className="text-red-400 text-xs mt-2 text-center flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {otpError}
                    </p>
                  )}
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={verifyOtpHandler}
                      disabled={otpLoading}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm sm:text-base font-medium transition-all"
                    >
                      <Key className="w-4 h-4" />
                      {otpLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <div className="mb-4 p-2.5 sm:p-3 bg-green-500/10 border border-green-400/20 rounded-xl flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>✓ Email verified successfully</span>
                </div>
              )}

              {/* Subject Field */}
              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Discussion"
                    className={`w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-800/50 border rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.subject ? "border-red-500/50" : "border-gray-700 focus:border-green-500"
                    }`}
                  />
                </div>
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  rows="4"
                  maxLength="500"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none ${
                    errors.message ? "border-red-500/50" : "border-gray-700 focus:border-green-500"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1.5 text-right">
                  {formData.message.length}/500
                </p>
              </div>

              {/* Submit Button - Mobile optimized */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !otpVerified}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl text-white text-sm sm:text-base font-medium transition-all ${
                  !otpVerified 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 shadow-lg shadow-green-500/30"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    Sending...
                  </>
                ) : !otpVerified ? (
                  "Verify Email First"
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus && (
                <div className={`mt-4 p-3 rounded-xl border flex items-center gap-2 text-xs sm:text-sm ${
                  submitStatus === "success"
                    ? "bg-green-500/10 border-green-400/20 text-green-400"
                    : "bg-red-500/10 border-red-400/20 text-red-400"
                }`}>
                  {submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="break-words">✓ Message sent successfully! I'll get back to you soon.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>✗ Something went wrong. Please try again.</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;