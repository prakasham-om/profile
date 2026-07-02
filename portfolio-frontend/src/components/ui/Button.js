// src/components/ui/Button.js
import React from "react";
import { Terminal } from "lucide-react";

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
    inline-flex items-center justify-center gap-2 font-mono font-medium rounded-lg
    transition-all duration-300 transform focus:outline-none focus:ring-2 
    focus:ring-offset-2 focus:ring-offset-transparent active:scale-95
    ${fullWidth ? "w-full" : "w-auto"}
    ${disabled || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-[1.02]"}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 to-cyan-500
      hover:from-blue-600 hover:to-cyan-600
      text-white shadow-lg shadow-blue-500/25
      focus:ring-blue-400
      border border-blue-400/20
    `,
    secondary: `
      border-2 border-blue-500/30 bg-black/30 backdrop-blur-sm
      hover:border-blue-400/60 hover:bg-blue-500/10
      text-blue-400 hover:text-blue-300
      focus:ring-blue-400
    `,
    outline: `
      border border-gray-700/50 bg-transparent
      hover:border-blue-400/50 hover:bg-blue-500/5
      text-gray-400 hover:text-blue-400
      focus:ring-blue-400
    `,
    ghost: `
      bg-transparent hover:bg-blue-500/10
      text-gray-400 hover:text-blue-400
      focus:ring-blue-400/50
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white shadow-lg shadow-red-500/25
      focus:ring-red-400
      border border-red-400/20
    `,
    success: `
      bg-gradient-to-r from-green-500 to-emerald-500
      hover:from-green-600 hover:to-emerald-600
      text-white shadow-lg shadow-green-500/25
      focus:ring-green-400
      border border-green-400/20
    `,
    terminal: `
      bg-gradient-to-r from-purple-500 to-pink-500
      hover:from-purple-600 hover:to-pink-600
      text-white shadow-lg shadow-purple-500/25
      focus:ring-purple-400
      border border-purple-400/20
      font-mono
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
    xl: "px-9 py-4 text-lg",
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  // Loading spinner
  const LoadingSpinner = () => (
    <div className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading...</span>
    </div>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className} relative overflow-hidden group`}
    >
      {/* Glow effect on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className={`absolute inset-0 ${variant === 'primary' || variant === 'terminal' ? 'bg-white/5' : 'bg-current/5'} rounded-lg`}></span>
      </span>

      {/* Terminal icon for terminal variant */}
      {variant === 'terminal' && !loading && (
        <Terminal className="w-4 h-4 mr-1" />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex items-center gap-2 relative z-10">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {/* Arrow effect on hover for primary/terminal variants */}
          {(variant === 'primary' || variant === 'terminal') && !loading && (
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-5px] group-hover:translate-x-0">
              →
            </span>
          )}
        </div>
      )}
    </button>
  );
};

export default Button;