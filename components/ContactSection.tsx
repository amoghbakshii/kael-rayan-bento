"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
  Calendar,
  MessageCircle,
} from "lucide-react";

// Contact Section
export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Enhanced shader animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = "rgba(0, 0, 0, 0.98)";
      ctx.fillRect(0, 0, width, height);

      // Multiple pulsing circles
      for (let i = 0; i < 3; i++) {
        const centerX = width * (0.2 + i * 0.3);
        const centerY = height * (0.3 + i * 0.2);

        for (let j = 0; j < 4; j++) {
          const radius = 30 + j * 60 + ((time * 1.5 + i * 30 + j * 15) % 300);
          const alpha = Math.max(0, 1 - radius / 300);

          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            radius - 20,
            centerX,
            centerY,
            radius
          );
          gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.15})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${alpha * 0.1})`);
          gradient.addColorStop(1, `rgba(147, 51, 234, ${alpha * 0.05})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const x = (width * (i / 20) + time * 0.5) % width;
        const y = height * 0.5 + Math.sin(time * 0.02 + i) * 100;
        const size = 2 + Math.sin(time * 0.05 + i) * 1;

        ctx.fillStyle = `rgba(6, 182, 212, ${
          0.3 + Math.sin(time * 0.03 + i) * 0.2
        })`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black py-32 px-6 md:px-20 overflow-hidden"
      id="contact"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-sm mb-8 shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-sm text-cyan-300 font-semibold uppercase tracking-wider">
              Let's Create Together
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
            START A
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              CONVERSATION
            </motion.span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have a vision? Let's bring it to life with
            <span className="text-cyan-400 font-medium">
              {" "}
              cinematic editing{" "}
            </span>
            that tells your story.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-1 w-40 mx-auto mt-10 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Interactive Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Quick Contact Options */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                Choose Your Channel
              </h3>

              {/* Email - Large Interactive Card */}
              <motion.a
                href="mailto:hello@kaelrayan.com"
                whileHover={{ scale: 1.03, x: 10 }}
                className="block p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent border-2 border-cyan-500/30 backdrop-blur-sm relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
                      <Mail className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Email Me
                  </h4>
                  <p className="text-cyan-300 font-medium mb-1 text-sm md:text-base break-all">
                    hello@kaelrayan.com
                  </p>
                  <p className="text-slate-400 text-xs md:text-sm">
                    Perfect for detailed project discussions
                  </p>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0%", "-200% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.a>

              {/* Phone & Location - Side by side */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <motion.a
                  href="tel:+919876543210"
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-2 md:mb-3" />
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Call
                    </p>
                    <p className="text-white font-semibold text-xs md:text-sm break-words">
                      +91 98765 43210
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mb-2 md:mb-3" />
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Based in
                    </p>
                    <p className="text-white font-semibold text-xs md:text-sm">
                      Mumbai, India
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Meeting Scheduler */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-5 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-purple-500/20 border border-purple-500/30 flex-shrink-0">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold mb-1 text-sm md:text-base">
                        Schedule a Call
                      </p>
                      <p className="text-purple-300 text-xs md:text-sm">
                        15-min free consultation
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" />
                </div>
              </motion.button>
            </div>

            {/* Social Links - Redesigned */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-slate-400">
                Connect on Social
              </h3>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {[
                  {
                    icon: Twitter,
                    label: "Twitter",
                    color: "from-blue-500/20 to-cyan-500/20",
                    iconColor: "text-blue-400",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    color: "from-pink-500/20 to-purple-500/20",
                    iconColor: "text-pink-400",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    color: "from-blue-600/20 to-blue-500/20",
                    iconColor: "text-blue-500",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    color: "from-slate-700/20 to-slate-600/20",
                    iconColor: "text-slate-400",
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ y: -10, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${social.color} border border-slate-700/50 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 md:gap-2 group relative overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <social.icon
                      className={`w-5 h-5 md:w-6 md:h-6 ${social.iconColor} relative z-10`}
                    />
                    <span className="text-[10px] md:text-xs text-slate-400 relative z-10 text-center leading-tight">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400 flex-shrink-0"
              />
              <div>
                <p className="text-green-400 font-semibold text-xs md:text-sm">
                  Available Now
                </p>
                <p className="text-slate-400 text-[10px] md:text-xs">
                  Response time: ~24 hours
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative">
              {/* Form Container */}
              <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1), transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Send a Message
                    </h3>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    {/* Name Input */}
                    <motion.div
                      animate={{
                        scale: activeField === "name" ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-xs md:text-sm font-medium text-slate-300 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-4 py-3.5 md:py-4 pl-11 md:pl-12 rounded-xl bg-slate-900/80 border-2 border-slate-700 focus:border-cyan-500 text-white placeholder-slate-500 transition-all outline-none text-sm md:text-base"
                          placeholder="Amogh Bakshi"
                        />
                        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <span className="text-cyan-400 text-xs font-bold">
                              👤
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      animate={{
                        scale: activeField === "email" ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-xs md:text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-4 py-3.5 md:py-4 pl-11 md:pl-12 rounded-xl bg-slate-900/80 border-2 border-slate-700 focus:border-cyan-500 text-white placeholder-slate-500 transition-all outline-none text-sm md:text-base"
                          placeholder="amogh@example.com"
                        />
                        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Mail className="w-3 h-3 text-blue-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Message Input */}
                    <motion.div
                      animate={{
                        scale: activeField === "message" ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-xs md:text-sm font-medium text-slate-300 mb-2">
                        Tell me about your project
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        rows={5}
                        className="w-full px-4 py-3.5 md:py-4 rounded-xl bg-slate-900/80 border-2 border-slate-700 focus:border-cyan-500 text-white placeholder-slate-500 transition-all outline-none resize-none text-sm md:text-base"
                        placeholder="I'm looking for a video editor who can..."
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting || isSuccess}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-6 md:px-8 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 md:gap-3 relative overflow-hidden ${
                        isSuccess
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white"
                      }`}
                    >
                      {/* Animated background on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />

                      <span className="relative z-10 flex items-center gap-2 md:gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span className="text-sm md:text-base">
                              Sending...
                            </span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="text-sm md:text-base">
                              Message Sent Successfully!
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm md:text-base">
                              Send Message
                            </span>
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Large background text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.015 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white pointer-events-none select-none tracking-tighter"
      >
        REACH OUT
      </motion.div>
    </section>
  );
}
