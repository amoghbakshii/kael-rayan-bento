"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Film, Zap, Palette, Sparkles, ArrowRight } from "lucide-react";

// -------------------- Gradient Text --------------------
const GradientText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 ${className}`}
  >
    {children}
  </span>
);

// -------------------- Sticky Scroll --------------------
const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    features: string[];
  }[];
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [particles, setParticles] = useState<
    { x: number; y: number; delay: number; duration: number }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  // handle scroll tracking
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / content.length);
    const closest = breakpoints.reduce((acc, val, i) => {
      return Math.abs(latest - val) < Math.abs(latest - breakpoints[acc])
        ? i
        : acc;
    }, 0);
    setActiveCard(closest);
  });

  // generate floating particle positions safely (client only)
  useEffect(() => {
    const arr = Array.from({ length: 8 }).map(() => ({
      x: Math.random() * 400,
      y: Math.random() * 500,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
    }));
    setParticles(arr);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[600px] overflow-y-auto overflow-x-hidden scrollbar-hide"
      id="work"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="relative flex gap-10 px-4 lg:px-10">
        {/* -------- Left Side: Text Cards -------- */}
        <div className="relative flex-1 py-10">
          {content.map((item, index) => (
            <div key={index} className="min-h-[500px] mb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: activeCard === index ? 1 : 0.9,
                    rotateZ: activeCard === index ? 0 : -5,
                  }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                  style={{
                    boxShadow:
                      activeCard === index
                        ? `0 0 30px ${item.gradient}40`
                        : "none",
                  }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                  {item.description}
                </p>

                <div className="space-y-3 pt-4">
                  {item.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: activeCard === index ? 1 : 0.4,
                        x: activeCard === index ? 0 : -10,
                      }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.gradient }}
                      />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {activeCard === index && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group mt-8 px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 flex items-center gap-2 text-slate-300 hover:text-white transition-all"
                  >
                    <span>View Examples</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>

        {/* -------- Right Side: Sticky Visual Card -------- */}
        <div className="hidden lg:block sticky top-10 h-[500px] w-[450px] flex-shrink-0">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-full w-full rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${content[activeCard].gradient}20, transparent)`,
              border: `1px solid ${content[activeCard].gradient}30`,
            }}
          >
            {/* Animated BG */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${content[activeCard].gradient}, transparent)`,
              }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Core content */}
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="space-y-6"
              >
                {/* Icon */}
                <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center">
                  <div style={{ color: content[activeCard].gradient }}>
                    {content[activeCard].icon}
                  </div>
                </div>

                {/* Title */}
                <h4
                  className="text-5xl font-bold"
                  style={{ color: content[activeCard].gradient }}
                >
                  {content[activeCard].title}
                </h4>

                {/* Floating Particles (hydration-safe) */}
                {particles.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: content[activeCard].gradient,
                      transform: `translateX(${p.x}px) translateY(${p.y}px)`,
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      y: [0, p.y - 30, p.y],
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Projects
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-700" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Rating
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// -------------------- Main Work Section --------------------
export function WorkSection() {
  const content = [
    {
      title: "Cinematic Cuts",
      description:
        "Precision storytelling through rhythm and emotion. Every frame serves the narrative with intentional pacing and seamless flow.",
      icon: <Film className="w-8 h-8" />,
      gradient: "#40ffaa",
      features: [
        "Music video & narrative editing",
        "Dynamic rhythm-based cutting",
        "Emotional arc development",
        "Professional color grading",
      ],
    },
    {
      title: "Short-Form Mastery",
      description:
        "Reels and UGC edits engineered for scroll-stopping retention and punchy pacing that commands attention in the first 3 seconds.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "#4079ff",
      features: [
        "Viral-optimized content structure",
        "Hook-driven storytelling",
        "Platform-specific formatting",
        "Trend-aware editing style",
      ],
    },
    {
      title: "Color & Tone Design",
      description:
        "Cohesive palettes, emotion-driven grading, and light that supports the story. Every hue purposefully chosen to enhance mood.",
      icon: <Palette className="w-8 h-8" />,
      gradient: "#ff5a5f",
      features: [
        "Cinematic LUT development",
        "Mood-based color theory",
        "Skin tone perfection",
        "Consistent brand aesthetics",
      ],
    },
    {
      title: "Creative Direction",
      description:
        "Concept-to-cut support for artists and brands who want edits that feel intentional, authentic, and unmistakably on-brand.",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "#ffc940",
      features: [
        "Full creative consultation",
        "Storyboard development",
        "Brand identity integration",
        "End-to-end project management",
      ],
    },
  ];

  return (
    <section
      id="the-work"
      className="relative min-h-screen bg-gradient-to-b from-[#0a0f15] via-[#05080d] to-black px-6 md:px-20 py-32 overflow-hidden"
    >
      {/* Background Orbs */}
      <motion.div
        className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium uppercase tracking-wider">
              What I Do Best
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            The Craft Behind
            <br />
            <GradientText>Every Frame</GradientText>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Four pillars of visual storytelling that define my approach to
            editing. Each one meticulously honed to create unforgettable
            experiences.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </motion.div>
      </div>

      {/* Sticky Scroll Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
