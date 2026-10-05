"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function GroomBrideSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="couple" className="relative w-full min-h-screen bg-transparent text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-t border-white/10">
      {/* 1. Ambient Vintage Sheen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.08)_0%,transparent_60%)]" />
      </div>

      {/* 2. Section Title in Flowing Script */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <div className="inline-flex items-center gap-2 mb-1.5">
          <div className="w-5 h-[1px] bg-[#d8c39e]/40" />
          <p className="text-[10px] tracking-[0.32em] uppercase font-serif text-[#d8c39e]">
            The Happy Couple
          </p>
          <div className="w-5 h-[1px] bg-[#d8c39e]/40" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          The Groom &amp; The Bride
        </h2>
      </motion.div>

      {/* 3. Seamless Vintage Editorial Layout (Tanpa Kotak Card) */}
      <div className="relative z-10 w-full max-w-[360px] flex flex-col items-center my-auto py-8">
        
        {/* THE GROOM */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
          className="w-full flex flex-col items-center text-center px-4"
        >
          {/* Role Header / Label */}
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-[9px] tracking-[0.35em] uppercase font-serif text-[#d8c39e] font-medium">
              ✦ The Groom ✦
            </span>
          </div>

          {/* Full Name */}
          <h3 className="text-2xl sm:text-[27px] font-serif font-medium text-[#fbf6ed] tracking-wide leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Sefrialdo Christian Alfan Rahmata
          </h3>

          {/* Location & Social Row */}
          <div className="mt-3 flex items-center justify-center gap-3 text-[#c9b79b]">
            <span className="text-[10px] tracking-[0.2em] uppercase font-serif opacity-80">
              Tanjungpinang, Kep. Riau
            </span>
            <span className="text-[#d8c39e]/40">•</span>
            <a
              href="https://instagram.com/Scristiannn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-[#d8c39e]/20 border border-[#d8c39e]/35 text-[#f7f1e6] text-[11px] font-sans tracking-wide transition-all active:scale-95 shadow-sm"
            >
              <svg className="w-3 h-3 text-[#d8c39e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@Scristiannn</span>
            </a>
          </div>
        </motion.div>

        {/* Vintage Ornamental Ampersand Divider */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" as const }}
          className="flex items-center justify-center gap-4 my-7 w-full max-w-[260px]"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d8c39e]/40 to-[#d8c39e]/10" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#ebdcc9] italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              &amp;
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d8c39e]/40 to-[#d8c39e]/10" />
        </motion.div>

        {/* THE BRIDE */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" as const }}
          className="w-full flex flex-col items-center text-center px-4"
        >
          {/* Role Header / Label */}
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-[9px] tracking-[0.35em] uppercase font-serif text-[#d8c39e] font-medium">
              ✦ The Bride ✦
            </span>
          </div>

          {/* Full Name */}
          <h3 className="text-2xl sm:text-[27px] font-serif font-medium text-[#fbf6ed] tracking-wide leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Yulienci Refi Anggraini
          </h3>

          {/* Location & Social Row */}
          <div className="mt-3 flex items-center justify-center gap-3 text-[#c9b79b]">
            <span className="text-[10px] tracking-[0.2em] uppercase font-serif opacity-80">
              Tanjungpinang, Kep. Riau
            </span>
            <span className="text-[#d8c39e]/40">•</span>
            <a
              href="https://instagram.com/yuley_lii"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-[#d8c39e]/20 border border-[#d8c39e]/35 text-[#f7f1e6] text-[11px] font-sans tracking-wide transition-all active:scale-95 shadow-sm"
            >
              <svg className="w-3 h-3 text-[#d8c39e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@yuley_lii</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Scroll Down Indicator */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" as const }}
        className="relative z-10 pb-4 flex flex-col items-center gap-1.5 text-[#d8c39e]/70"
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
