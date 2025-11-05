"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Work", href: "#the-work" },
  { name: "Projects", href: "#projects" },
  { name: "Clients", href: "#clients" },
  { name: "Contact", href: "#contact" },
];

export const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add subtle scroll background activation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-cyan-500/10 shadow-[0_4px_20px_rgba(6,182,212,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Branding */}
        <motion.a
          href="#hero"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="text-lg font-semibold text-white tracking-wide">
            Kael <span className="text-cyan-400">Rayan</span>
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-slate-300 hover:text-white tracking-wide transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <motion.a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full border border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-cyan-500/10 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          whileHover={{ scale: 1.05 }}
        >
          Let’s Talk
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-slate-200"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-slate-300 hover:text-white transition-all"
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            {NAV_LINKS.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className="text-2xl text-white font-semibold hover:text-cyan-400 transition-all tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={toggleMenu}
              className="mt-6 px-8 py-3 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:text-white transition-all text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
