"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared";
import {
  BookOpen,
  Star,
  MessageCircle,
  Users,
  CreditCard,
  Send,
  HelpCircle,
  Home,
} from "lucide-react";
import { BurgerMenu } from "./burger-menu";
import Link from "next/link";

interface Props {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const menu = [
  {
    label: "Главная",
    icon: <Home className="size-5" />,
    link: "/",
  },
  {
    label: "FAQ",
    icon: <HelpCircle className="size-5" />,
    link: "/faq",
  },
  {
    label: "Отзывы",
    icon: <MessageCircle className="size-5" />,
    link: "https://t.me/easysteamru/258",
  },
  {
    label: "Канал",
    icon: <Send className="size-5" />,
    link: "https://t.me/easysteamru",
  },
];

export const Sidebar = ({ className, isOpen = true, onClose }: Props) => {
  const [onlineCount, setOnlineCount] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(32, Math.min(36, newCount));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Overlay для мобильных */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Бургер меню для мобильных */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <BurgerMenu isOpen={isOpen} onClick={onClose || (() => {})} />
      </div>

      {/* Боковое меню */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed gap-8 inset-y-0 left-0 w-25 bg-[#1B2531] h-full flex flex-col items-center py-12 z-40",
          "lg:translate-x-0 sidebar-mobile", // На десктопе всегда видимо
          className
        )}
      >
        {menu.map((item) => (
          <Link
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            key={item.label}
            onClick={() => {
              // Закрываем только на мобильных устройствах
              if (window.innerWidth < 1024) {
                onClose?.();
              }
            }}
            className="flex flex-row justify-start items-center gap-4 pl-12 w-full opacity-75 md:flex-col md:gap-1.5 md:items-center md:pl-0 md:w-auto"
          >
            <div className="[&>svg]:size-6 md:[&>svg]:size-5">{item.icon}</div>
            <p className="text-white text-base font-medium text-left m-0 md:!text-xs md:font-normal">
              {item.label}
            </p>
          </Link>
        ))}

        <div className="mt-auto flex flex-row justify-start items-center gap-4 pl-12 w-full md:flex-col md:items-center md:gap-4 md:pl-0 md:w-auto">
          <div className="flex flex-row items-center md:flex-col gap-4 md:gap-0">
            <Users className="size-7 text-[#75b022] blink-animation md:size-5" />
            <div className="flex flex-col items-start md:items-center">
              <p className="text-[#75b022] !leading-none !font-semibold text-lg mt-0 md:!text-sm md:mt-2">
                {onlineCount}
              </p>
              <p className="text-white/75 !leading-none text-sm mt-1 md:!text-xs">
                Онлайн
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-4 pl-12 w-full md:flex-col md:items-center md:gap-4 md:pl-0 md:w-auto">
          <div className="flex flex-row gap-4 md:gap-0 items-center md:flex-col">
            <CreditCard className="size-7 text-[#66c0f4] md:size-5" />
            <div className="flex flex-col items-start md:items-center">
              <p className="text-[#66c0f4] !leading-none !font-semibold text-lg mt-0 md:!text-sm md:mt-2">
                43839
              </p>
              <p className="text-white/75 !leading-none text-sm mt-1 md:!text-xs">
                Пополнений
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
