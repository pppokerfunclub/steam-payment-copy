import type { Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { MobileLayout } from "@/components/mobile-layout";
import { Footer } from "@/components/footer";
import { SupportButton } from "@/components/support-button"; // ← добавь

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${interTight.variable} antialiased h-full flex flex-col`}
      >
        <MobileLayout>{children}</MobileLayout>

        <SupportButton href="https://t.me/easysteamry" />

        {/* <Footer /> */}
      </body>
    </html>
  );
}
