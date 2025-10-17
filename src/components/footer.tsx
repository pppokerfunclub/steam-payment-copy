import React from "react";
import { cn } from "@/shared";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer
      className={cn(
        "bg-[#1C252C] border-t border-[#313C42] py-6 px-4 mt-30",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mt-6 pt-4 border-t border-[#313C42]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/terms"
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/offer"
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                Публичная оферта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
