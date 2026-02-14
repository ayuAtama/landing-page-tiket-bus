"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Layanan", href: "#layanan" },
  { label: "Harga", href: "#harga" },
  { label: "Tentang", href: "#tentang" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleNavClick = (href: any) => {
    setOpen(false);

    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300); // tunggu animasi selesai
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Bus className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Loket Tugumulyo
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pesan"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#pesan"
                onClick={() => handleNavClick("#pesan")}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent"
              >
                Pesan Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
