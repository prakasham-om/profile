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
  glow = false,
  borderGlow = false,
  ...props
}) => {
  const variants = {
    default: `
      bg-black/40 backdrop-blur-sm 
      border border-blue-500/10 
      shadow-lg shadow-blue-500/5
    `,
    solid: `
      bg-gray-900/60 backdrop-blur-sm 
      border border-gray-700/50 
      shadow-lg shadow-gray-500/5
    `,
    gradient: `
      bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10 
      border border-blue-400/20 
      shadow-lg shadow-blue-500/10
    `,
    terminal: `
      bg-black/50 backdrop-blur-sm 
      border border-blue-500/20 
      shadow-lg shadow-blue-500/10
      font-mono
    `,
    hacker: `
      bg-gradient-to-br from-green-950/30 via-emerald-950/20 to-cyan-950/30 
      border border-green-500/20 
      shadow-lg shadow-green-500/10
    `,
    transparent: `
      bg-transparent 
      border border-blue-500/10 
      shadow-none
    `,
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  // Terminal header for terminal variant
  const TerminalHeader = () => (
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-500/10">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
      </div>
      <span className="text-xs text-gray-500 font-mono ml-2">developer@portfolio:~$</span>
    </div>
  );

  // Glow effects
  const glowClasses = glow ? `
    relative overflow-hidden
    before:absolute before:inset-0 before:rounded-xl 
    before:bg-gradient-to-r before:from-blue-500/10 before:via-cyan-500/10 before:to-purple-500/10 
    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
  ` : "";

  const borderGlowClasses = borderGlow ? `
    relative
    before:absolute before:-inset-0.5 before:rounded-xl 
    before:bg-gradient-to-r before:from-blue-500 before:via-cyan-500 before:to-purple-500 
    before:opacity-30 before:blur-sm
    before:transition-opacity before:duration-500
    hover:before:opacity-60
  ` : "";

  const baseClasses = `
    rounded-xl transition-all duration-300 relative
    ${variants[variant]}
    ${paddings[padding]}
    ${hover ? "hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${glowClasses}
    ${borderGlowClasses}
    ${className}
  `;

  const cardProps = {
    className: baseClasses,
    onClick,
    ...props,
  };

  // Render with terminal header if terminal variant
  const renderContent = () => {
    if (variant === 'terminal') {
      return (
        <>
          <TerminalHeader />
          {children}
        </>
      );
    }
    return children;
  };

  // Hover animation with spring
  const hoverAnimation = {
    whileHover: { 
      scale: 1.02,
      y: -4,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  };

  // Glow ring animation
  const glowRing = glow ? {
    initial: { opacity: 0 },
    whileHover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } : {};

  if (hover) {
    return (
      <motion.div
        {...cardProps}
        {...hoverAnimation}
        {...glowRing}
      >
        {renderContent()}
        
        {/* Animated border glow on hover */}
        {borderGlow && (
          <motion.div
            className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-0 blur-sm -z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* Scanning line effect for terminal variant */}
        {variant === 'terminal' && (
          <motion.div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-scan"></div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div {...cardProps}>
      {renderContent()}
    </div>
  );
};

export default Card;