// src/components/ui/Modal.js
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal,  Circle } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  closeOnBackdrop = true,
  showCloseButton = true,
  variant = "default",
  showTerminalHeader = false,
}) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-none mx-4",
  };

  const variants = {
    default: `
      bg-gray-900/95 backdrop-blur-md 
      border border-blue-500/20 
      shadow-2xl shadow-blue-500/10
    `,
    terminal: `
      bg-black/95 backdrop-blur-md 
      border border-blue-500/30 
      shadow-2xl shadow-blue-500/20
      font-mono
    `,
    hacker: `
      bg-green-950/95 backdrop-blur-md 
      border border-green-500/30 
      shadow-2xl shadow-green-500/20
      font-mono
    `,
    glass: `
      bg-white/5 backdrop-blur-xl 
      border border-white/20 
      shadow-2xl shadow-white/5
    `,
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  // Terminal Window Header
  const TerminalHeader = () => (
    <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-blue-500/10">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
        </div>
        <span className="text-xs text-gray-500 font-mono ml-2">
          {title || "developer@portfolio:~$"}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-500/20 rounded transition-colors text-gray-500 hover:text-red-400"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Hacker Style Header
  const HackerHeader = () => (
    <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-green-500/10">
      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-green-400" />
        <span className="text-xs text-green-400 font-mono">
          {title || "root@hacker:~$"}
        </span>
        <span className="text-xs text-green-500/50 animate-pulse">●</span>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-red-500/20 rounded transition-colors text-gray-500 hover:text-red-400"
        aria-label="Close modal"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );

  // Render header based on variant
  const renderHeader = () => {
    if (showTerminalHeader || variant === 'terminal') {
      return <TerminalHeader />;
    }
    if (variant === 'hacker') {
      return <HackerHeader />;
    }
    if (title || showCloseButton) {
      return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-500/10">
          {title && (
            <h2 className="text-xl font-bold text-white font-mono">
              <span className="text-blue-400">$</span> {title.toLowerCase()}
            </h2>
          )}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors text-gray-400 hover:text-blue-400 group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleBackdropClick}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className={`
                relative rounded-2xl shadow-2xl 
                w-full ${sizes[size]} max-h-[90vh] overflow-hidden
                ${variants[variant] || variants.default}
              `}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Glow effect for terminal/hacker variants */}
              {(variant === 'terminal' || variant === 'hacker') && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
                </div>
              )}

              {/* Header */}
              {renderHeader()}

              {/* Content with scroll */}
              <div className={`p-6 overflow-y-auto max-h-[calc(90vh-80px)] ${
                variant === 'terminal' || variant === 'hacker' ? 'font-mono' : ''
              }`}>
                {/* Terminal prompt for terminal variant content */}
                {variant === 'terminal' && (
                  <div className="text-xs text-gray-500 mb-4 font-mono">
                    <span className="text-green-400">$</span> cat modal_content.txt
                  </div>
                )}
                {variant === 'hacker' && (
                  <div className="text-xs text-green-500/50 mb-4 font-mono">
                    <span className="text-green-400">root@hacker:~$</span> ./show_content.sh
                  </div>
                )}
                {children}
              </div>

              {/* Footer with status for terminal variant */}
              {variant === 'terminal' && (
                <div className="px-6 py-2 border-t border-blue-500/10 bg-black/30">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      <span>online</span>
                    </span>
                    <span>LNC 1,0-1</span>
                  </div>
                </div>
              )}

              {/* Footer for hacker variant */}
              {variant === 'hacker' && (
                <div className="px-6 py-2 border-t border-green-500/10 bg-black/30">
                  <div className="flex items-center justify-between text-xs text-green-500/50 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      <span>root access</span>
                    </span>
                    <span>0x7F3A</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;