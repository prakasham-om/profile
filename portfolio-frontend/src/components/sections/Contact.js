// src/components/sections/Contact.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { ANIMATION_VARIANTS } from "../../utils/constants";
import { validateEmail } from "../../utils/helpers";
import Button from "../ui/Button";
import { contactAPI } from "../../services/api";

// Small Input Field
const InputField = ({ label, name, value, onChange, error, placeholder }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-gray-900/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition-all duration-300 ${
        error ? "border-red-500" : "border-gray-700"
      }`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

// Small Textarea Field
const TextareaField = ({ label, name, value, onChange, error, placeholder, maxLength }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={4}
      className="w-full px-3 py-2 bg-gray-900/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition-all duration-300 resize-none"
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    <p className="text-gray-400 text-xs mt-1">{value.length}/{maxLength}</p>
  </div>
);

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
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setOtpError("Enter a valid email");
      return;
    }
    try {
      setOtpLoading(true);
      const res = await contactAPI.sendOtp({ email: formData.email, name: formData.name });
      if (res.success) setOtpSent(true);
      else setOtpError(res.message || "Failed to send OTP");
    } catch {
      setOtpError("Failed to send OTP");
    } finally { setOtpLoading(false); }
  };

  const verifyOtpHandler = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setOtpError("Enter 6-digit OTP");
      return;
    }
    try {
      setOtpLoading(true);
      const res = await contactAPI.verifyOtp({ email: formData.email, otp });
      if (res.success) setOtpVerified(true);
      else setOtpError(res.message || "OTP verification failed");
    } catch {
      setOtpError("OTP verification failed");
    } finally { setOtpLoading(false); }
  };

  const handleSubmit = async () => {
    if (!otpVerified) { setOtpError("Verify your email first"); return; }
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await contactAPI.sendMessage(formData);
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setOtpSent(false); setOtp(""); setOtpVerified(false);
      } else setSubmitStatus("error");
    } catch { setSubmitStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section id="contact" className="py-12 px-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <motion.div className="text-center mb-8" variants={ANIMATION_VARIANTS.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Contact Me</h2>
          <p className="text-gray-400 text-sm">Fill out the form below and I'll get back to you soon.</p>
        </motion.div>

        {/* Form */}
        <motion.div variants={ANIMATION_VARIANTS.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700 shadow-inner space-y-4">
            <InputField label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} placeholder="Your full name" />
            <InputField label="Email *" name="email" value={formData.email} onChange={handleInputChange} error={errors.email || otpError} placeholder="your.email@example.com" />

            {!otpVerified && !otpSent && validateEmail(formData.email) && (
              <Button onClick={sendOtp} variant="secondary" size="sm" loading={otpLoading}>Send OTP</Button>
            )}

            {otpSent && !otpVerified && (
              <div>
                <InputField label="OTP *" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} error={otpError} placeholder="6-digit OTP" />
                <Button onClick={verifyOtpHandler} variant="secondary" size="sm" loading={otpLoading}>Verify OTP</Button>
              </div>
            )}

            {otpVerified && <div className="p-1 bg-green-500/10 text-green-400 rounded text-xs">✓ OTP verified</div>}

            <InputField label="Subject *" name="subject" value={formData.subject} onChange={handleInputChange} error={errors.subject} placeholder="What's this about?" />
            <TextareaField label="Message *" name="message" value={formData.message} onChange={handleInputChange} error={errors.message} placeholder="Write your message..." maxLength={500} />

            <Button onClick={handleSubmit} variant="primary" size="md" fullWidth loading={isSubmitting} icon={!isSubmitting && <Send className="w-4 h-4" />}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>

            {submitStatus && (
              <div className={`p-2 rounded border text-xs ${submitStatus === "success" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-red-500/10 border-red-500 text-red-400"}`}>
                {submitStatus === "success" ? "✓ Message sent!" : "✗ Something went wrong."}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
