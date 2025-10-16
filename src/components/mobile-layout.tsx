"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export const MobileLayout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Sidebar isOpen={isMenuOpen} onClose={toggleMenu} />
      <main className="flex-1 lg:ml-25">{children}</main>
    </>
  );
};
