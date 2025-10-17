"use client";

import { Container } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function BannerPage() {
  return (
    <div className="w-full min-h-screen bg-[#0F1419] flex items-center justify-center">
      <Container className="py-8">
        <div className="max-w-2xl mx-auto bg-[#1C252C] rounded-lg p-8 text-center">
          {/* Логотип Steam */}
          <div className="flex justify-center mb-8">
            <div className="size-32 bg-[#212E36] rounded-2xl flex items-center justify-center">
              <Image
                src="/assets/steam.png"
                alt="steam"
                className="size-24"
                width={96}
                height={96}
              />
            </div>
          </div>

          {/* Заголовок */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Совсем скоро мы вернем возможность оплат
          </h1>

          {/* Описание */}
          <div className="space-y-4 text-white/80 text-lg leading-relaxed mb-8">
            <p>
              Мы работаем над улучшением системы пополнения баланса Steam и
              временно приостановили прием платежей.
            </p>
            <p>
              В ближайшее время функционал будет восстановлен с новыми
              возможностями и улучшенной безопасностью.
            </p>
          </div>

          {/* Кнопка возврата */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#0391F5] hover:bg-[#0284d4] text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Вернуться на главную
            </Link>
            {/* <Link
              href="/terms"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#313C42] hover:border-[#0391F5] text-white/80 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Политика конфиденциальности
            </Link> */}
          </div>

          {/* Контактная информация */}
          {/* <div className="mt-8 pt-6 border-t border-[#313C42]">
            <p className="text-white/60 text-sm mb-2">
              По вопросам обращайтесь:
            </p>
            <a
              href="mailto:contact@easy-steam.ru"
              className="text-[#0391F5] hover:text-[#0284d4] font-medium transition-colors"
            >
              contact@easy-steam.ru
            </a>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
