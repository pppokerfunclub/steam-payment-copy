"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import { cn } from "@/shared";
import { useState } from "react";

interface Props {
  href: string;
  label?: string;
  className?: string;
}

export function SupportButton({ href, label = "Поддержка", className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
      className={cn("fixed right-4 bottom-4 z-50", className)}
      style={{
        // чтобы не прилипало к вырезу на iOS
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        right: "calc(1rem + env(safe-area-inset-right))",
      }}
    >
      {/* Tooltip с информацией о времени работы */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        className="absolute right-0 bottom-20 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap"
      >
        <div className="text-sm font-medium">Тех поддержка с 10 до 23 МСК</div>

        <div className="absolute right-4 bottom-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
      </motion.div>

      <Link
        href={href}
        target="_blank"
        aria-label={label}
        className={cn(
          "inline-grid place-items-center size-12 md:size-16 rounded-full",
          "bg-[#1B2531] text-white shadow-lg ring-1 ring-white/10",
          "hover:ring-white/25 hover:scale-[1.03] active:scale-95 transition"
        )}
      >
        <MessageCircleQuestion className="size-6 md:size-8" />
      </Link>
    </motion.div>
  );
}
