"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const BurgerMenu = ({ isOpen, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-8 h-8 z-50 ${className}`}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    >
      <motion.div
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {isOpen ? (
          <X className="size-8 text-white" />
        ) : (
          <Menu className="size-8 text-white" />
        )}
      </motion.div>
    </button>
  );
};
