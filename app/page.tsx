"use client";

import { motion, Variants } from "framer-motion"; // Import Variants
import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";
import { ProjectsShowcase } from "@/components/ProjectShowcase";
import { ClientsCollaborationSection } from "@/components/ClientsCollaborationSection";
import { ContactSection } from "@/components/ContactSection";
import { Navbar1 } from "@/components/ui/navbar-1";

// Explicitly type sectionVariants with the Variants type
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // This will now be correctly interpreted as a cubic-bezier tuple
    },
  },
};

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#050810] text-white">
      <Navbar1 />

      {/* Hero Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <HeroSection />
      </motion.div>

      {/* Work Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <WorkSection />
      </motion.div>

      {/* Projects Showcase */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ProjectsShowcase />
      </motion.div>

      {/* Clients Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ClientsCollaborationSection />
      </motion.div>

      {/* Contact Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ContactSection />
      </motion.div>
    </main>
  );
}
