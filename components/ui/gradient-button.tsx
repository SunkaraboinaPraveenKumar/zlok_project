"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function GradientButton({
  children,
  className = "",
  onClick,
  variant = "primary",
}: GradientButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden group",
        variant === "primary"
          ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
          : "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}