// src/components/ui/Button.js
import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  disabled = false,
  className = "",
  type = "button",
  loading = false,
  fullWidth = false,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-lg
    transition-all duration-200 transform focus:outline-none focus:ring-2 
    focus:ring-offset-2 focus:ring-offset-transparent active:scale-95
    ${fullWidth ? "w-full" : "w-auto"}
    ${disabled || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-pink-600
      hover:from-purple-700 hover:to-pink-700
      text-white shadow-lg shadow-purple-500/25
      focus:ring-purple-500
    `,
    secondary: `
      border-2 border-purple-400 bg-transparent
      hover:bg-purple-400/10 text-white
      focus:ring-purple-400
    `,
    outline: `
      border border-gray-300 bg-transparent
      hover:bg-gray-50 text-gray-700 hover:text-gray-900
      focus:ring-gray-500
    `,
    ghost: `
      bg-transparent hover:bg-white/10
      text-gray-300 hover:text-white
      focus:ring-white/50
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700
      hover:from-red-700 hover:to-red-800
      text-white shadow-lg shadow-red-500/25
      focus:ring-red-500
    `,
    success: `
      bg-gradient-to-r from-green-600 to-green-700
      hover:from-green-700 hover:to-green-800
      text-white shadow-lg shadow-green-500/25
      focus:ring-green-500
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-sm md:text-base",
    lg: "px-6 py-3 text-base md:text-lg",
    xl: "px-8 py-4 text-lg md:text-xl",
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0 text-xl">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
