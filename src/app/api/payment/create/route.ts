import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";
import { Bot } from "grammy";

const API_HOST = "https://paygate.gamemoney.com";
const PROJECT_ID = process.env.GAMEMONEY_PROJECT_ID as string;
const HMAC_KEY = process.env.GAMEMONEY_HMAC_KEY as string;

const bot = new Bot(process.env.BOT_TOKEN ?? "");

// генерация случайного IP
function randomIp() {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ].join(".");
}

function buildSignString(data: Record<string, any>): string {
  const isScalar = (x: any) => !["object"].includes(typeof x) || x === null;

  const recurse = (obj: any): string => {
    if (Array.isArray(obj)) {
      return obj
        .map((v, i) => (isScalar(v) ? `${i}:${v};` : `${i}:${recurse(v)}`))
        .join("");
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj)
        .sort()
        .map((k) =>
          isScalar(obj[k]) ? `${k}:${obj[k]};` : `${k}:${recurse(obj[k])};`
        )
        .join("");
    } else {
      return `${obj};`;
    }
  };

  return recurse(data);
}

function generateSignature(pairs: [string, any][]): string {
  const tree: Record<string, any> = {};
  const buckets: Record<string, any[]> = {};

  for (const [k, v] of pairs) {
    if (k === "signature") continue;
    if (k.endsWith("[]")) {
      const base = k.slice(0, -2);
      if (!buckets[base]) buckets[base] = [];
      buckets[base].push(v);
    } else {
      tree[k] = v;
    }
  }
  for (const base in buckets) {
    tree[base] = buckets[base];
  }

  const signString = buildSignString(tree);
  return crypto.createHmac("sha256", HMAC_KEY).update(signString).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login, email, amount } = body;

    if (!login || !email || !amount || amount < 1000) {
      return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
    }

    // случайный IP вместо реального
    const ip = randomIp();
    const userLogin = String(login ?? "").trim();
    const userWithPrefix = userLogin.startsWith("ST-")
      ? userLogin
      : `ST-${userLogin}`;
    const pairs: [string, any][] = [
      ["project", PROJECT_ID],
      ["type", "sbp"],
      ["user", userWithPrefix], // сюда передаём логин
      ["ip", ip],
      ["amount", amount.toString()],
      ["success_url", `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`],
    ];

    const signature = generateSignature(pairs);
    pairs.push(["signature", signature]);

    const formData = new URLSearchParams();
    for (const [k, v] of pairs) {
      formData.append(k, v);
    }

    const response = await axios.post(
      `${API_HOST}/invoice`,
      formData.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const invoice = response.data;

    console.log(response.data);

    // уведомление в Telegram
    await bot.api.sendMessage(
      process.env.BOT_CHAT_ID as string,
      `
<b>Попытка оплаты</b>

<b>ID:</b> <code>${invoice.invoice}</code>
<b>Логин:</b> ${login}
<b>Сумма:</b> ${amount} RUB
      `,
      { parse_mode: "HTML" }
    );

    // ⚠️ Возвращаем тот же формат, что и в Pay1time
    return NextResponse.json({
      success: true,
      url: invoice.data,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Ошибка платежа" }, { status: 500 });
  }
}
