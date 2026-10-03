"use client";

import { motion } from "framer-motion";

export default function ThankYouFooter() {
  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <footer className="relative w-full text-center overflow-hidden select-none bg-gradient-to-b from-[#180306] via-[#22070c] to-[#120204] border-t border-[#d8c39e]/30 text-[#f7f2ea] shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
      {/* 1. Paper Texture & Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.08)_0%,transparent_60%)]" />
      </div>

      {/* 2. Main "THANK YOU" Section (Exactly matching user screenshot 3) */}
      <div className="relative z-10 px-6 py-20 flex flex-col items-center">
        {/* Monogram Crest Circle: S & Y */}
        <motion.div
          {...fadeInUp}
          className="w-14 h-14 rounded-full border border-[#d8c39e]/50 flex items-center justify-center mb-6 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(216,195,158,0.25)] mx-auto"
        >
          <span className="font-serif text-[#ebdcc9] tracking-widest text-sm font-semibold">
            C &amp; Y
          </span>
        </motion.div>

        {/* Title: THANK YOU */}
        <motion.h3
          {...fadeInUp}
          transition={{ delay: 0.1, duration: 0.85, ease: "easeOut" as const }}
          className="font-serif text-3xl sm:text-4xl text-[#fbf6ed] tracking-[0.25em] font-normal mb-6 uppercase"
        >
          Thank You
        </motion.h3>

        {/* Quote */}
        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.15, duration: 0.85, ease: "easeOut" as const }}
          className="font-serif text-sm sm:text-base text-[#dcd0bf] italic leading-relaxed max-w-xs mb-8"
        >
          &ldquo;Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.&rdquo;
        </motion.p>

        {/* Kami Yang Berbahagia */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25, duration: 0.85, ease: "easeOut" as const }}
          className="space-y-1.5"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.25em] text-[#a8957c] uppercase font-sans font-light">
            Kami yang berbahagia,
          </p>
          <div className="flex flex-col items-center gap-0.5 my-1.5">
            <h4 className="font-serif text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#faeec5] to-[#dfb858] font-bold tracking-wide">
              Christian Alfan Rahmatal
            </h4>
            <span className="text-sm sm:text-base font-serif italic text-[#d8c39e]">&amp;</span>
            <h4 className="font-serif text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#faeec5] to-[#dfb858] font-bold tracking-wide">
              Yulienci Refi Anggraini
            </h4>
          </div>
          <p className="text-xs text-[#a8957c] font-serif pt-0.5">
            Beserta segenap keluarga besar
          </p>
        </motion.div>
      </div>

      {/* 3. Bottom Company Copyright Footer Bar (Exactly like screenshot 3) */}
      <div className="px-6 py-5 border-t border-white/5 text-center bg-black/70">
        <p className="text-[9px] tracking-[0.25em] uppercase text-[#a8957c] font-light">
          Crafted with love by{" "}
          <span className="text-[#edd896] font-medium tracking-[0.15em]">
            Subahgroup &amp; Aksenraras
          </span>
        </p>
        <p className="text-[8px] tracking-[0.15em] text-[#73634f] mt-1 font-sans">
          &copy; 2026 Subahgroup &amp; Aksenraras &bull; All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
