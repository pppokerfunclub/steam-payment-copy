"use client";

import type { ReactNode } from "react";
import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { MobileLayout } from "@/components/mobile-layout";
import { Footer } from "@/components/footer";
import { SupportButton } from "@/components/support-button";
import { usePathname } from "next/navigation";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLegalPage = pathname === "/terms" || pathname === "/offer";

  return (
    <html lang="ru" className="h-full">
      <body
        className={`${interTight.variable} antialiased h-full flex flex-col`}
      >
        {isLegalPage ? (
          children
        ) : (
          <>
            <MobileLayout>{children}</MobileLayout>
            <SupportButton href="https://t.me/easysteamry" />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
