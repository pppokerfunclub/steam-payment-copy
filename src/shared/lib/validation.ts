"use client";

import { z } from "zod";

export const steamFormSchema = z.object({
  login: z
    .string()
    .min(1, "Логин обязателен")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Логин должен содержать только латинские буквы, цифры и подчеркивания"
    )
    .min(3, "Логин должен содержать минимум 3 символа")
    .max(20, "Логин не должен превышать 20 символов"),
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .regex(/^7\d{10}$/, "Телефон должен быть в формате 7XXXXXXXXXX"),
  amount: z
    .number()
    .min(1000, "Минимальная сумма 1000 ₽")
    .max(100000, "Максимальная сумма 100 000 ₽"),
  termsAccepted: z.boolean(),
});

export type SteamFormData = z.infer<typeof steamFormSchema>;
