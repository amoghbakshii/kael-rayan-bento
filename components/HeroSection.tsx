"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Play, ChevronDown, Film, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar1 } from "./ui/navbar-1";

// --- Animated Text Reveal ---
const BlurText = ({
  text,
  delay = 120,
  className = "",
  onAnimationComplete,
}: {
  text: string;
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void;
}) => {
  const [visible, setVisible] = useState<number[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const totalWords = words.length;
    words.forEach((_, i) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
        if (i === totalWords - 1) onAnimationComplete?.();
      }, i * delay)
    );
  }, [text, delay, words, onAnimationComplete]);

  return (
    <h1 className={cn("inline-block", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block mr-3 transition-all duration-700"
          style={{
            opacity: visible.includes(i) ? 1 : 0,
            filter: visible.includes(i) ? "blur(0px)" : "blur(12px)",
            transform: visible.includes(i)
              ? "translateY(0)"
              : "translateY(20px)",
          }}
        >
          {w}
        </span>
      ))}
    </h1>
  );
};

// --- Video Modal ---
const VideoDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) =>
  isOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-cyan-500/40 shadow-cyan-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <iframe
          width="951"
          height="476"
          src="https://www.youtube.com/embed/gTqKCeiGSbk"
          title="India Will Surprise You – A Cinematic Travel film"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </motion.div>
    </motion.div>
  ) : null;

// --- Floating Film Strips ---
const FloatingFilmStrip = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 0.15, y: 0 }}
    transition={{ duration: 2, delay }}
    className="absolute pointer-events-none"
  >
    <motion.div
      animate={{
        y: [0, -30, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Film className="w-16 h-16 text-cyan-400" strokeWidth={1} />
    </motion.div>
  </motion.div>
);

// --- Particles ---
const Particles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      id="hero"
    >
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: dimensions.height + 20,
            opacity: 0,
          }}
          animate={{
            y: -20,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// --- Stats Counter ---
const StatCounter = ({
  end,
  label,
  suffix = "",
}: {
  end: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16 || 1);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
};

// --- HERO SECTION ---
export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center px-4 pt-28 overflow-hidden bg-deep-black">
      <Navbar1 />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Particles */}
      <Particles />

      {/* Floating film strips */}
      <div className="absolute top-1/4 left-10 hidden lg:block">
        <FloatingFilmStrip delay={0} />
      </div>
      <div className="absolute bottom-1/3 right-20 hidden lg:block">
        <FloatingFilmStrip delay={0.5} />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center max-w-6xl mx-auto"
      >
        {/* Cinematic tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 text-cyan-400 font-medium uppercase tracking-[0.35em] mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>Visual Storyteller</span>
        </motion.div>

        {/* Main heading */}
        <BlurText
          text="Every Frame Tells a Story"
          delay={100}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white leading-tight tracking-tight"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-lg md:text-2xl text-slate-300 max-w-3xl leading-relaxed"
        >
          Turning emotion into <span className="text-cyan-400">motion</span>.
          Crafting rhythm, depth, and feeling through cinematic edits.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button
            onClick={() => setIsVideoOpen(true)}
            className="group relative px-10 py-5 border-2 border-cyan-500 rounded-full text-cyan-300 font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
              whileHover={{ scale: 1.1 }}
            />
            <span className="relative flex items-center justify-center gap-2 group-hover:text-white">
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Showreel
            </span>
          </button>

          <a
            href="#the-work"
            className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
          >
            <motion.span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              Explore Work
              <Zap className="w-5 h-5" />
            </span>
          </a>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="grid grid-cols-3 gap-8 md:gap-16 mt-20 pt-12 border-t border-slate-800/50"
        >
          <StatCounter end={150} label="Projects" suffix="+" />
          <StatCounter end={50} label="Clients" suffix="+" />
          <StatCounter end={12} label="Awards" suffix="" />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#the-work"
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-slate-500 text-xs uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
          Discover More
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-cyan-400" />
        </motion.div>
      </motion.a>

      <VideoDialog isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}
