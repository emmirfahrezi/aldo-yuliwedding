"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function BibleQuoteSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="quote" className="relative w-full min-h-screen bg-gradient-to-b from-[#1c0408] via-[#2a0910] to-[#180306] text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-y border-[#d8c39e]/25 shadow-[0_0_50px_rgba(0,0,0,0.7)]">
      {/* 1. Paper Texture & Subtle Diagonal Silk Sheen Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-35" />
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.09)_0%,transparent_60%)]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(180,30,50,0.15)_0%,transparent_60%)]" />
      </div>

      {/* 2. Section Title in Flowing Script */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-serif text-[#d8c39e] mb-1">
          Holy Matrimony
        </p>
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          A Note of Love
        </h2>
      </motion.div>

      {/* 3. Centerpiece: Antique Victorian Ornate Filigree Oval Frame with Wedding Rings */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
        className="relative z-10 my-4 flex items-center justify-center"
      >
        <div className="relative w-[210px] sm:w-[230px] aspect-[4/5] flex items-center justify-center drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]">
          <img
            src="/images/vintage_rings_oval.webp"
            alt="Wedding Rings on Roses"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain filter contrast-[1.03]"
          />
        </div>
      </motion.div>

      {/* 4. Editorial Scripture & Love Note */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" as const }}
        className="relative z-10 max-w-[360px] px-2 flex flex-col items-center space-y-4"
      >
        {/* Intro sentence */}
        <p className="text-xs sm:text-[13px] font-serif text-[#f2e7d8] leading-relaxed tracking-wide">
          Our wedding day is almost here, and we couldn&apos;t imagine celebrating it without you.
        </p>

        {/* 1 Korintus 13:4-7 */}
        <div className="pt-2 pb-1 border-y border-[#d8c39e]/20 space-y-2 text-[11px] sm:text-xs font-serif italic text-[#e5d4be] leading-relaxed">
          <p className="not-italic text-[10px] tracking-[0.25em] uppercase font-serif text-[#d8c39e] font-semibold mb-1">
            1 Korintus 13 : 4 &ndash; 7
          </p>
          <p>
            &ldquo;Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.
            Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain.
          </p>
          <p>
            Ia menutupi segala sesuatu, percaya segala sesuatu, mengharapkan segala sesuatu, sabar menanggung segala sesuatu.
            <span className="not-italic font-semibold text-[#fbf6ed] block mt-1">
              Kasih tidak berkesudahan.&rdquo;
            </span>
          </p>
        </div>

        {/* Kolose 3:14 */}
        <p className="text-[11px] font-serif italic text-[#c9b79b] leading-relaxed">
          &ldquo;Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan.&rdquo;
          <span className="not-italic text-[9px] tracking-[0.2em] uppercase font-bold text-[#d8c39e] block mt-0.5">
            (Kolose 3:14)
          </span>
        </p>

        {/* Signature */}
        <div className="pt-2 flex flex-col items-center">
          <span className="text-[9px] tracking-[0.3em] uppercase font-serif text-[#c5a880]">
            With All Our Love
          </span>
          <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] mt-1">
            Christian &amp; Yulienci
          </h3>
        </div>
      </motion.div>

      {/* 5. Bottom Scroll Down Indicator */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" as const }}
        className="relative z-10 pt-4 flex flex-col items-center gap-1.5 text-[#d8c39e]/70"
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
