"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Sparkles, Quote } from "lucide-react";

// Aurora Background Component
const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/10 blur-[150px]"
      animate={{
        x: [0, 150, -100, 0],
        y: [0, 100, -50, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute right-0 bottom-0 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-transparent blur-[120px]"
      animate={{
        x: [0, -120, 50, 0],
        y: [0, -60, 60, 0],
        scale: [1.2, 1, 1.2],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 🔹 Brand Orbit with Icons
const BrandOrbit = ({
  logos,
  depth = 1,
  speed = 200,
}: {
  logos: string[];
  depth?: number;
  speed?: number;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, depth * 60]);

  return (
    <motion.div
      style={{ y }}
      className="flex justify-center gap-20 py-8 overflow-hidden select-none"
    >
      {[...logos, ...logos].map((logo, i) => (
        <motion.img
          key={i}
          src={logo}
          alt="Brand icon"
          className="w-20 h-20 object-contain opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          animate={{
            x: [0, -speed],
          }}
          transition={{
            duration: 10 + depth * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

// Testimonial Highlight Component
const HighlightedTestimonial = ({ testimonial }: any) => (
  <motion.div
    key={testimonial.author}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.8 }}
    className="text-center max-w-3xl mx-auto"
  >
    <Quote className="w-10 h-10 text-cyan-400/60 mx-auto mb-6" />
    <p className="text-slate-300 text-xl italic mb-6 leading-relaxed">
      “{testimonial.quote}”
    </p>
    <h4 className="text-white font-bold text-lg">{testimonial.author}</h4>
    <p className="text-sm text-cyan-400 font-medium">
      {testimonial.role} — {testimonial.company}
    </p>
  </motion.div>
);

// Stat Counter Component
const Stat = ({ number, label }: { number: string; label: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(number) || 0;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 border border-slate-700/50 backdrop-blur-md text-center relative overflow-hidden shadow-xl"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 mb-3">
        {isNaN(parseInt(number)) ? number : `${count}+`}
      </h3>
      <p className="text-slate-400 uppercase tracking-wider text-sm font-medium">
        {label}
      </p>
    </motion.div>
  );
};

// 🔥 Main Section
export function ClientsCollaborationSection() {
  const testimonials = [
    {
      quote:
        "Kael’s storytelling through motion is nothing short of magic. He transformed our launch into a cinematic experience.",
      author: "Priya Sharma",
      role: "Co-Founder",
      company: "QuickBite",
    },
    {
      quote:
        "His rhythm and pacing gave our campaign video the energy we didn’t even know it needed.",
      author: "Arjun Mehta",
      role: "Marketing Head",
      company: "Craftly",
    },
    {
      quote:
        "Kael doesn’t edit — he orchestrates emotion. Every frame, every beat, perfectly aligned with our brand’s soul.",
      author: "Neha Kapoor",
      role: "Creative Lead",
      company: "FitNova",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Use online icon PNGs
  const logosA = [
    "https://www.citypng.com/public/uploads/preview/adidas-white-logo-hd-png-701751694777208ogwssxbgpj.png",
    "https://img.icons8.com/color/96/000000/apple-logo.png",
    "https://img.icons8.com/color/96/000000/google-logo.png",
    "https://img.icons8.com/color/96/000000/netflix.png",
    "https://img.icons8.com/color/96/000000/spotify.png",
    "https://img.icons8.com/color/96/000000/tesla-logo.png",
  ];

  const logosB = [
    "https://img.icons8.com/color/96/000000/snapchat.png",
    "https://img.icons8.com/color/96/000000/instagram-new--v1.png",
    "https://img.icons8.com/color/96/000000/twitterx--v1.png",
    "https://img.icons8.com/color/96/000000/meta.png",
    "https://img.icons8.com/color/96/000000/youtube-play.png",
    "https://img.icons8.com/color/96/000000/amazon.png",
  ];

  const stats = [
    { number: "150", label: "Projects Completed" },
    { number: "50", label: "Happy Clients" },
    { number: "15", label: "Million Views" },
    { number: "4.9", label: "Avg Rating" },
  ];

  return (
    <section
      className="relative min-h-screen bg-[#050810] text-white py-32 overflow-hidden"
      id="clients"
    >
      <AuroraBackground />

      {/* Title */}
      <div className="relative z-10 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-cyan-400/20 mb-6 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-widest">
              Trusted by Visionaries
            </span>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-8">
            BRANDS THAT
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              BELIEVE IN ME
            </motion.span>
          </h2>
        </motion.div>
      </div>

      {/* Animated Logos */}
      <div className="relative z-10 mb-32">
        <BrandOrbit logos={logosA} depth={1} speed={250} />
        <BrandOrbit logos={logosB} depth={2} speed={300} />
      </div>

      {/* Testimonial Highlight */}
      <div className="relative z-10 mb-32">
        <AnimatePresence mode="wait">
          <HighlightedTestimonial
            testimonial={testimonials[activeTestimonial]}
          />
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {stats.map((s, i) => (
          <Stat key={i} {...s} />
        ))}
      </div>

      {/* Background Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white tracking-tighter pointer-events-none select-none"
      >
        CLIENTS
      </motion.h1>
    </section>
  );
}
