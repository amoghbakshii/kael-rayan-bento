"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Award,
} from "lucide-react";

// Sparkles Component
const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  className = "",
  particleColor = "#FFFFFF",
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    const particleCount = Math.floor(
      (dimensions.width * dimensions.height) / particleDensity
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.y -= particle.speedY;
        particle.opacity =
          Math.sin(Date.now() * 0.001 + particle.x) * 0.5 + 0.5;

        if (particle.y < 0) {
          particle.y = dimensions.height;
          particle.x = Math.random() * dimensions.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions, particleDensity, minSize, maxSize, particleColor]);

  return (
    <canvas ref={canvasRef} className={className} style={{ background }} />
  );
};

// Projects Data
const projects = [
  {
    id: 1,
    title: "Neon Dreams",
    category: "Music Video",
    description:
      "A cyberpunk-inspired visual journey through sound and color, featuring dynamic cuts synchronized to electronic beats.",
    thumbnail:
      "https://images.pexels.com/photos/5411700/pexels-photo-5411700.png",
    year: "2024",
    awards: "Best Editing - Indie Film Festival",
    stats: { views: "2.4M", duration: "3:42" },
    videoLink: "https://www.youtube.com/watch?v=ibNrPjETR_k",
  },
  {
    id: 2,
    title: "Urban Pulse",
    category: "Commercial",
    description:
      "High-energy brand campaign showcasing the rhythm of city life through rapid-fire montages and seamless transitions.",
    thumbnail:
      "https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg",
    year: "2024",
    awards: "Gold - Advertising Awards",
    stats: { views: "5.1M", duration: "1:30" },
    videoLink: "https://www.youtube.com/watch?v=R_QhwOWZ98I",
  },
  {
    id: 3,
    title: "Ethereal",
    category: "Short Film",
    description:
      "A haunting narrative piece exploring memory and loss through carefully crafted color grading and atmospheric pacing.",
    thumbnail:
      "https://images.pexels.com/photos/1538077/pexels-photo-1538077.jpeg",
    year: "2023",
    awards: "Audience Choice Award",
    stats: { views: "1.8M", duration: "8:15" },
    videoLink: "https://www.youtube.com/watch?v=Qs2-klYtq5Y",
  },
  {
    id: 4,
    title: "Velocity",
    category: "Sports Reel",
    description:
      "Adrenaline-pumping sports highlights cut to perfection, emphasizing speed, power, and athletic excellence.",
    thumbnail:
      "https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg",
    year: "2024",
    awards: "Best Sports Content",
    stats: { views: "3.2M", duration: "2:20" },
    videoLink: "https://www.youtube.com/watch?v=xuas_Yc7VNQ",
  },
  {
    id: 5,
    title: "Midnight Sonata",
    category: "Music Video",
    description:
      "Classical meets contemporary in this visually stunning piece featuring intricate piano work and emotional depth.",
    thumbnail:
      "https://images.pexels.com/photos/2775580/pexels-photo-2775580.jpeg",
    year: "2023",
    awards: "Director's Pick",
    stats: { views: "1.5M", duration: "4:05" },
    videoLink: "https://www.youtube.com/watch?v=QR--yREuQQk",
  },
];

// Project Card Component
const ProjectCard = ({
  project,
  isActive,
}: {
  project: (typeof projects)[0];
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 50,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full aspect-video rounded-3xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <motion.img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover rounded-3xl"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Animated overlay gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0.5,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
        }}
        className="absolute inset-0 rounded-3xl"
      />

      {/* Project Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 30,
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 p-8 text-white z-20"
      >
        {/* Category */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-wider mb-4 border border-white/20">
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          <span className="text-cyan-200">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-4xl font-bold mb-2">{project.title}</h3>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">{project.year}</span>
            <span>{project.stats.duration}</span>
          </div>
          {project.awards && (
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
              <Award className="w-3 h-3" />
              {project.awards}
            </div>
          )}
        </div>
      </motion.div>

      {/* Hover Play Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex items-center justify-center z-30"
      >
        <button
          onClick={() => setShowVideo(true)}
          className="bg-cyan-500/90 hover:bg-cyan-400 text-white rounded-full p-4 shadow-lg backdrop-blur-md flex items-center gap-2 transition-all"
        >
          <Play className="w-6 h-6" fill="currentColor" />
          <span className="font-medium">Watch</span>
        </button>
      </motion.div>

      {/* Border Glow */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? "0 0 40px rgba(6, 182, 212, 0.3)"
            : "0 0 0px rgba(6, 182, 212, 0)",
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 border border-cyan-500/30 rounded-3xl"
      />

      {/* Video Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-[90%] md:w-[70%] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full rounded-2xl shadow-2xl"
                src={
                  project.videoLink.replace("watch?v=", "embed/") +
                  "?autoplay=1"
                }
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white transition text-sm"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Projects Section
export function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState(1); // for smooth transitions

  // Auto-slide logic
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, activeIndex]);

  const handleNext = () => {
    setDirection(1);
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      className="relative min-h-screen bg-black py-20 px-6 md:px-20 overflow-hidden"
      id="projects"
    >
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ---------------- LEFT SIDE TEXT ---------------- */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
                FEATURED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
                  WORK
                </span>
              </h2>

              <div className="w-full h-32 relative -mt-8">
                {/* Sparkle bar */}
                <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[2px] blur-sm" />
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1.2}
                  particleDensity={800}
                  className="w-full h-full"
                  particleColor="#06b6d4"
                />
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(400px_150px_at_top,transparent_20%,white)]" />
              </div>
            </motion.div>

            {/* Description + now showing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl text-slate-400 leading-relaxed">
                A curated selection of my most impactful projects. Each one
                crafted with
                <span className="text-cyan-400 font-medium">
                  {" "}
                  meticulous attention{" "}
                </span>
                to rhythm, emotion, and visual storytelling.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                  <span className="text-sm text-cyan-400 font-medium uppercase tracking-wider">
                    Now Showing
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-cyan-500 to-transparent" />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-3"
                  >
                    <h3 className="text-3xl font-bold text-white">
                      {projects[activeIndex].title}
                    </h3>
                    <p className="text-slate-400">
                      {projects[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Project counter */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="h-px w-16 bg-slate-700 mb-2" />
                  <span className="text-slate-500 text-sm">
                    of {String(projects.length).padStart(2, "0")} projects
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---------------- RIGHT SIDE CAROUSEL ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Project Cards */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={projects[activeIndex].id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <ProjectCard
                    project={projects[activeIndex]}
                    isActive={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-8 right-8 flex gap-3 z-20">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="group relative"
                >
                  <div
                    className={`h-1 transition-all duration-300 rounded-full ${
                      index === activeIndex
                        ? "w-12 bg-cyan-500"
                        : "w-8 bg-slate-700 group-hover:bg-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white pointer-events-none select-none whitespace-nowrap"
      >
        WORK
      </motion.div>
    </section>
  );
}
