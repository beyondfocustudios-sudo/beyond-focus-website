"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  const [scrolled, setScrolled] = useState(isLight);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(isLight || y > 50);
      // Hide on ANY scroll down, show on scroll up
      if (y > 80) {
        const delta = y - lastScrollY.current;
        if (delta > 2) {
          setHidden(true); // scrolling down — hide
        } else if (delta < -2) {
          setHidden(false); // scrolling up — show
        }
      } else {
        setHidden(false); // near top — always show
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLight]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-symbol.png"
              alt="Beyond Focus"
              width={30}
              height={30}
              className={`h-[36px] w-auto transition-all duration-300 ${
                scrolled ? "brightness-0" : "brightness-0 invert"
              }`}
            />
            <span
              className={`text-base font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[#0E3A45]" : "text-white"
              }`}
            >
              Beyond Focus
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-[#0E3A45]/70 hover:text-[#0E3A45]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-orange transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contacto"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
                scrolled
                  ? "bg-[#0E3A45] text-white hover:bg-[#0E3A45]/90"
                  : "bg-white text-[#0E3A45] hover:bg-white/90"
              }`}
            >
              Fala Connosco
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block h-[2px] w-6 transition-colors duration-300 ${scrolled ? "bg-[#0E3A45]" : "bg-white"}`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block h-[2px] w-6 transition-colors duration-300 ${scrolled ? "bg-[#0E3A45]" : "bg-white"}`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block h-[2px] w-6 transition-colors duration-300 ${scrolled ? "bg-[#0E3A45]" : "bg-white"}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-20 lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-medium text-[#0E3A45]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-full bg-[#0E3A45] px-8 py-3 text-base font-semibold text-white"
              >
                Fala Connosco
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
