"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, WarningIcon } from "@/components";
import Image from "next/image";
import { cn } from "@/shared";
import steam from "@public/assets/steam.png";
import sbp from "@public/assets/sbp.png";
import mir from "@public/assets/mir.png";

export function SteamPaymentForm() {
  const data = [
    {
      label: "1000 ₽",
      value: "1000",
    },
    {
      label: "1500 ₽",
      value: "1500",
    },
    {
      label: "2000 ₽",
      value: "2000",
    },
    {
      label: "5000 ₽",
      value: "5000",
    },
    {
      label: "10 000 ₽",
      value: "10000",
    },
  ];

  const paymentMethods = [
    {
      image: sbp,
      value: "sbp",
      width: 30,
      height: 30,
    },
    {
      image: mir,
      value: "mir",
      width: 40,
      height: 40,
    },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("sbp");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!login) {
      newErrors.login = "Логин обязателен";
    } else if (!/^[a-zA-Z0-9_]+$/.test(login)) {
      newErrors.login =
        "Логин должен содержать только латинские буквы, цифры и подчеркивания";
    } else if (login.length < 3) {
      newErrors.login = "Логин должен содержать минимум 3 символа";
    } else if (login.length > 20) {
      newErrors.login = "Логин не должен превышать 20 символов";
    }

    if (!email) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!amount || amount < 1000) {
      newErrors.amount = "Минимальная сумма 1000 ₽";
    } else if (amount > 100000) {
      newErrors.amount = "Максимальная сумма 100 000 ₽";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "Необходимо принять условия";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = login && email && amount >= 1000 && termsAccepted;

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const invoiceResponse = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          email,
          amount,
        }),
      });

      if (!invoiceResponse.ok) {
        const errorData = await invoiceResponse.json();
        alert(errorData.error || "Ошибка при создании инвойса");
        return;
      }

      const invoiceData = await invoiceResponse.json();
      console.log(invoiceData);
      // router.push(invoiceData.url);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Ошибка при создании платежа");
    }
  };

  const handleAmountClick = (value: string) => {
    setAmount(parseInt(value));
  };

  return (
    <div className="w-full">
      <div>
        <Container className="bg-[#1C252C] p-4 rounded-lg mt-10 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4 flex-col md:flex-row">
              <div className="size-25 flex-shrink-0 bg-[#212E36] rounded-2xl flex items-center justify-center">
                <Image src={steam} alt="steam" className="size-20" />
              </div>
              <div className="flex flex-col gap-1.5 items-center md:items-start">
                <div className="inline-flex flex-col items-center md:items-start gap-1">
                  <h3>Пополнение баланса Steam</h3>
                  <div className="inline-flex p-2 bg-[#19313D] rounded-xl w-max">
                    <p className="!font-semibold">🔥 Выгодное предложение</p>
                  </div>
                  <p className="!text-white/55">Аккаунты РФ и стран СНГ.</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-4 w-full mt-4">
                <div className="w-full">
                  <p className="text-sm mb-2">Где искать?</p>
                  <input
                    type="text"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full px-3 py-2 bg-[#212E36] border border-[#313C42] rounded-lg text-white placeholder-white/40 focus:border-[#0391F5] focus:outline-none"
                  />
                  {errors.login && (
                    <p className="text-xs text-red-500 mt-1">{errors.login}</p>
                  )}
                  {!errors.login && (
                    <p className="text-xs text-white/30 mt-1">
                      Логин вводится только на латинице
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <p className="text-sm mb-2">Email</p>
                  <input
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#212E36] border border-[#313C42] rounded-lg text-white placeholder-white/40 focus:border-[#0391F5] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="w-full flex items-start gap-4 flex-col md:flex-row">
                  <div className="w-full">
                    <p className="text-sm mb-2">Сумма пополнения в рублях</p>
                    <input
                      type="number"
                      placeholder="От 1000 ₽"
                      value={amount || ""}
                      onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-[#212E36] border border-[#313C42] rounded-lg text-white placeholder-white/40 focus:border-[#0391F5] focus:outline-none"
                    />
                    {errors.amount && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.amount}
                      </p>
                    )}
                    {!errors.amount && (
                      <p className="text-xs text-white/30 mt-1">
                        Минимальная сумма 1000 ₽
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm">К зачислению на Steam</p>
                    <div className="h-10 px-3 bg-[#212E36] rounded-lg flex items-center gap-2">
                      <Image src={steam} alt="steam" className="size-5" />
                      <p>
                        {amount > 0 ? `${Math.floor(amount * 0.94)} ₽` : "0 ₽"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-60 flex gap-2 flex-wrap">
                {data.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAmountClick(item.value)}
                    className="cursor-pointer border border-[#313C42] w-max inline-flex items-center px-2 py-1.5 bg-[#213037] rounded-lg"
                  >
                    <p className="text-xs">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 flex flex-col bg-[#212E36] rounded-lg">
            <h4>К оплате</h4>
            <div className="bg-[#0391F5]/20 mt-3 w-full rounded-xl flex items-center gap-1.5 p-2">
              <WarningIcon className="size-5 fill-[#0391F5] flex-shrink-0" />
              <p className="!text-xs">
                Пожалуйста ознакомитесь с важной информацией до совершения
                пополнения.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 mt-5">
              <div className="flex items-center justify-between w-full">
                <p>Конвертация</p>
                <p className="!font-semibold">0 ₽</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Итого</p>
                <p className="!font-semibold">
                  {amount > 0 ? `${amount} ₽` : "0 ₽"}
                </p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Кешбек на SIH баланс</p>
                <p className="!font-semibold !text-[#60C295]">0 ₽</p>
              </div>
            </div>
            <div className="mt-5 w-full flex-col">
              <p className="!font-medium">Выберите способ оплаты</p>
              <div className="w-full rounded-lg bg-[#131B1E] p-1 mt-2 flex items-center">
                {paymentMethods.map((item) => (
                  <button
                    key={item.value}
                    className={cn(
                      "w-full h-10 cursor-pointer flex items-center justify-center rounded-md",
                      selectedPaymentMethod === item.value && "bg-[#1C252C]"
                    )}
                    onClick={() => setSelectedPaymentMethod(item.value)}
                  >
                    <Image
                      src={item.image}
                      alt={item.value}
                      className="object-contain"
                      width={item.width}
                      height={item.height}
                    />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!isFormValid}
              className={cn(
                "w-full h-11 mt-5 rounded-lg flex items-center justify-center transition-all duration-300",
                isFormValid
                  ? "bg-[#0391F5] cursor-pointer opacity-100 hover:bg-[#0284d4]"
                  : "bg-[#0391F5] opacity-50 cursor-not-allowed"
              )}
            >
              <p className="!font-semibold">Перейти к оплате</p>
            </button>
            <div className="mt-5 flex items-center gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="bg-[#191820] checked:bg-[#0391F5] accent-[#0391F5]"
              />
              <p className="!text-xs">Я ознакомлен с правилами и условиями</p>
            </div>
            {errors.termsAccepted && (
              <p className="text-xs text-red-500 mt-1">
                {errors.termsAccepted}
              </p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
