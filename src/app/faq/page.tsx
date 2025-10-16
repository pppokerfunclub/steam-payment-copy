"use client";

import { useState } from "react";
import { Container } from "@/components";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/shared";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "ВАЖНО! Требования к аккаунту",
    answer:
      "Есть перечень требований к аккаунту, соответствие которых позволит нам совершить пополнение баланса:\n\nСтраной Вашего аккаунта должна быть Россия (и следовательно, валюта аккаунта — рубли).\n\nЕсли регион вашего аккаунта: Крым, Лнр, Днр, то лучше всего включить STEAM заранее, за 15 минут до покупки.\n\nТакже мы НЕ сможем отправить средства пользователям из следующих регионов: Страны Европы, США, Турция, Аргентина, Бразилия, а также аккаунты, на которых красная табличка (КТ).",
  },
  {
    question: "Пришла сумма меньше чем в калькуляторе. Что делать?",
    answer:
      "Для пополнения нам приходится конвертировать средства в разные валюты.\n\nИногда сумма может отличаться на 1-5% от указанной.",
  },
  {
    question: "Политика возврата",
    answer:
      "Если вы проигнорировали требования к аккаунту и все же попытались отправить себе средства, то они не дойдут (исключения Крым, Днр, Лнр).\n\nВ этом случае Вы вправе запросить возврат в ТП.\n\nНа Qiwi-кошелек И банковскую карту средства будут возвращены с вычетом 15% от суммы. Сумма возврата любая.\n\nОтнеситесь к этому ответственно.",
  },
  {
    question: "Не приходят деньги на баланс аккаунта Steam",
    answer:
      "Если Вы указали верно ЛОГИН (это не никнейм) и баланс Вашего аккаунта - рубли (₽), пополнение происходит моментально.\n\nЕсли Вам не поступили средства на баланс в течении 10 минут, пожалуйста обратитесь в техническую поддержку.",
  },
  {
    question: "Я указал неверный логин",
    answer:
      "Если такого логина в Steam не существует, то деньги не пропадут и мы сможем переотправить их на корректный логин.\n\nНезамедлительно обратитесь в техническую поддержку.\n\nУкажите какой логин написали при заказе, и какой логин — верный.",
  },
  {
    question: 'Что такое "Логин"?',
    answer:
      "Логин — это то что вы вводите при авторизации, у каждого пользователя он уникальный, а никнейм вы можете менять по своему усмотрению. Людей с ником QWERTY может быть сотни. Не перепутайте ваш логин и никнейм.",
  },
  {
    question: "Комиссия сервиса",
    answer:
      "За каждое пополнение мы как сервис берем небольшую комиссию, каждый день она имеет разное значение, и зависит в большей степени от курсов конвертации валют.\n\nКурс валюты фиксирован в течении дня, но в зависимости от спроса и предложения размер комиссии может уменьшаться / увеличиваться.\n\nЭто единственная комиссия, которую Вы заплатите на нашем сайте. Других скрытых от пользователя комиссий на сайте нет!",
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-white/70 text-lg">
              Ответы на самые популярные вопросы о пополнении Steam
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-[#1C252C] rounded-lg border border-[#313C42] overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="cursor-pointer w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#212E36] transition-colors"
                >
                  <h3 className="text-lg font-medium pr-4">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="size-5 text-white/60 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div className="text-white/80 leading-relaxed pt-5 whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-[#1C252C] rounded-lg p-8 border border-[#313C42]">
              <h3 className="text-xl font-semibold mb-4">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-white/70 mb-6">
                Свяжитесь с нашей службой поддержки
              </p>
              <a
                href="https://t.me/easysteamry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0391F5] hover:bg-[#0284d4] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Написать в поддержку
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
