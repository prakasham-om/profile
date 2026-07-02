// src/components/sections/Contact.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, Mail, User, MessageSquare, Lock, Key, CheckCircle, AlertCircle, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { ANIMATION_VARIANTS } from "../../utils/constants";
import { validateEmail } from "../../utils/helpers";
import Button from "../ui/Button";
import { contactAPI } from "../../services/api";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";

// OTP INPUT COMPONENT
const OtpInput = ({ value, setValue }) => {
  const handleInput = (digit, index) => {
    if (!/^[0-9]?$/.test(digit)) return;
    let arr = value.split("");
    arr[index] = digit;
    const newOtp = arr.join("");
    setValue(newOtp);
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array(6).fill("").map((_, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInput(e.target.value, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          className="w-12 h-14 text-center text-white bg-gray-800/50 border-2 border-gray-600 rounded-xl text-xl font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/20 font-mono text-sm text-blue-400 mb-4">
            <Terminal className="w-4 h-4" />
            <span>$ contact --connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss and build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - Left Side */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/10">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-blue-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">{PERSONAL_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/20">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{PERSONAL_INFO.phone}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-700/50">
                <p className="text-gray-400 text-sm mb-4">Connect with me</p>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-400/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75"></span>
                </div>
                <div>
                  <p className="text-white font-medium">Available for work</p>
                  <p className="text-gray-400 text-sm">Open to opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            className="lg:col-span-3"
            variants={ANIMATION_VARIANTS.fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/10">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name ? "border-red-500/50" : "border-gray-700 focus:border-blue-500"
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
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.email || otpError ? "border-red-500/50" : "border-gray-700 focus:border-blue-500"
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

              {/* OTP Section */}
              {!otpVerified && !otpSent && validateEmail(formData.email) && (
                <div className="mb-4">
                  <Button
                    onClick={sendOtp}
                    variant="secondary"
                    size="sm"
                    loading={otpLoading}
                    className="font-medium"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Send Verification OTP
                  </Button>
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="mb-4 p-4 bg-blue-500/5 rounded-xl border border-blue-400/20">
                  <p className="text-gray-300 text-sm mb-3 text-center">
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
                    <Button
                      onClick={verifyOtpHandler}
                      variant="primary"
                      size="sm"
                      loading={otpLoading}
                      className="font-medium"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Verify OTP
                    </Button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-400/20 rounded-xl flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>✓ Email verified successfully</span>
                </div>
              )}

              {/* Subject Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Discussion"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.subject ? "border-red-500/50" : "border-gray-700 focus:border-blue-500"
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
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  rows="4"
                  maxLength="500"
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    errors.message ? "border-red-500/50" : "border-gray-700 focus:border-blue-500"
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

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                icon={!isSubmitting && <Send className="w-5 h-5" />}
                disabled={!otpVerified}
                className="font-medium text-base"
              >
                {isSubmitting ? "Sending..." : !otpVerified ? "Verify Email First" : "Send Message"}
              </Button>

              {submitStatus && (
                <div className={`mt-4 p-3 rounded-xl border flex items-center gap-2 ${
                  submitStatus === "success"
                    ? "bg-green-500/10 border-green-400/20 text-green-400"
                    : "bg-red-500/10 border-red-400/20 text-red-400"
                }`}>
                  {submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>✓ Message sent successfully! I'll get back to you soon.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
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