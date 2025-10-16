"use client";

import { Container } from "@/components";
import Image from "next/image";
import steam from "@public/assets/steam.png";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="w-full">
      <Container className="bg-[#1C252C] p-6 rounded-lg mt-10 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src={steam} alt="steam" className="size-8" />
            <h1 className="text-xl font-semibold text-green-400">
              Оплата успешна!
            </h1>
          </div>

          <div className="text-center">
            <p className="text-white/80 mb-4">
              Ваш баланс Steam был успешно пополнен
            </p>
            <p className="text-white/60 text-sm">
              Средства поступят на ваш аккаунт в течение нескольких минут
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-[#0391F5] hover:bg-[#0284d4] text-white py-3 px-4 rounded-lg transition-colors"
          >
            Сделать еще один платеж
          </button>
        </div>
      </Container>
    </div>
  );
}
