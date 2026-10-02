"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="hero" className="relative w-full min-h-screen bg-transparent flex flex-col justify-between items-center text-center overflow-hidden select-none text-[#f7f2ea] px-6 py-16">
      {/* 2. Top Header Intro Badge */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 flex flex-col items-center pt-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#d8c39e]/30 backdrop-blur-xs shadow-sm">
          <Sparkles className="w-3 h-3 text-[#d8c39e]" />
          <span className="text-[10px] tracking-[0.32em] uppercase font-serif text-[#d8c39e] font-medium">
            The Wedding Celebration Of
          </span>
          <Sparkles className="w-3 h-3 text-[#d8c39e]" />
        </div>
      </motion.div>

      {/* 3. Center Couple Typography */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
        className="relative z-10 my-auto py-8 px-4 flex flex-col items-center"
      >
        {/* Subtitle */}
        <p className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-serif text-[#d8c39e] mb-4 opacity-95">
          Join Us in Celebrating
        </p>

        {/* Couple Names in Flowing Romantic Vintage Script */}
        <h1 className="text-5xl sm:text-6xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] tracking-wide leading-[1.25] text-[#fbf6ed] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Sefrialdo &amp; Yulienci
        </h1>

        <div className="w-12 h-[1px] bg-[#d8c39e]/50 my-6" />

        {/* Date and Location */}
        <div className="flex flex-col items-center gap-1.5 text-xs tracking-[0.3em] uppercase font-serif text-[#ebdcc9] opacity-90">
          <span>Saturday, October 24, 2026</span>
          <span className="text-[10px] tracking-[0.25em] text-[#c9b79b]">
            Tanjungpinang, Kepulauan Riau
          </span>
        </div>
      </motion.div>

      {/* 4. Bottom Scroll Down Indicator */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as const }}
        className="relative z-10 pb-6 flex flex-col items-center gap-1.5 text-[#d8c39e]/70"
      >
        <span className="text-[8px] tracking-[0.3em] uppercase font-serif text-[#ebdcc9]/60">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#d8c39e]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
