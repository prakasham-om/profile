// src/components/ui/Card.js
import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  variant = "default",
  padding = "md",
  onClick,
  ...props
}) => {
  const variants = {
    default: "bg-white/5 backdrop-blur-md border border-white/10 shadow-sm",
    solid: "bg-gray-800 border border-gray-700 shadow-md",
    gradient:
      "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 shadow-lg",
    transparent: "bg-transparent border border-white/20 shadow-none",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const baseClasses = `
    rounded-xl transition-all duration-300
    ${variants[variant]}
    ${paddings[padding]}
    ${hover ? "hover:scale-105 hover:shadow-xl hover:brightness-110" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `;

  const cardProps = {
    className: baseClasses,
    onClick,
    ...props,
  };

  return hover ? (
    <motion.div
      {...cardProps}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  ) : (
    <div {...cardProps}>{children}</div>
  );
};

export default Card;
