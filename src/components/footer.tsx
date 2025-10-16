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
        <div className="flex flex-col md:flex-row justify-between items-start text-white/60 text-sm gap-6">
          <div className="space-y-1">
            <p className="font-semibold text-white/80">ООО «Космо-АйТи»</p>
            <p>ИНН: 02609202210030</p>
            <p>ОКПО: 31571570</p>
          </div>
          <div className="text-left md:text-right space-y-1">
            <p>
              Регистрационный орган: Министерство юстиции Кыргызской Республики
            </p>
            <p>
              Юридический адрес: Кыргызская Республика, 720007, г. Бишкек, ул.
              Киевская, 112/5
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#313C42]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/terms"
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                Пользовательское соглашение
              </Link>
              <Link
                href="/offer"
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                Публичная оферта
              </Link>
            </div>
            <p className="text-white/40 text-xs">
              © 2024 ООО «Космо-АйТи». Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
