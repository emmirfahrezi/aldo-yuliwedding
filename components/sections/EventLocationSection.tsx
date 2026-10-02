"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ChevronDown, ExternalLink } from "lucide-react";

export default function EventLocationSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="event" className="relative w-full min-h-screen bg-transparent text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-t border-white/10">
      {/* 1. Ambient Vintage Sheen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.08)_0%,transparent_60%)]" />
      </div>

      {/* 2. Header */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-serif text-[#d8c39e] mb-1">
          Date &amp; Location
        </p>
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          Wedding Events
        </h2>
      </motion.div>

      {/* 3. Event Cards */}
      <div className="relative z-10 w-full max-w-[380px] flex flex-col gap-6 my-auto py-6">
        
        {/* EVENT 1: PEMBERANGKATAN MEMPELAI */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
          className="group relative p-6 rounded-2xl bg-black/35 border border-[#d8c39e]/30 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
            <span className="text-[10px] tracking-[0.25em] uppercase font-serif text-[#d8c39e] font-semibold">
              Pemberangkatan
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#ebdcc9]">
              <Calendar className="w-3.5 h-3.5 text-[#d8c39e]" />
              <span className="font-serif">24 Okt 2026</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#fbf6ed] tracking-wide mb-1">
            Gereja Kota GPIB
          </h3>
          <p className="text-xs font-serif text-[#dcd0bf] mb-4 leading-relaxed">
            Ibadah Pemberangkatan &amp; Pemberkatan Kudus Kedua Mempelai
          </p>

          {/* Time & Location */}
          <div className="space-y-2 text-xs font-serif text-[#b8a68d] mb-5">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#d8c39e]" />
              <span className="text-[#f2e7d8]">09:00 WIB &ndash; Selesai</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d8c39e] shrink-0 mt-0.5" />
              <span className="text-[#dcd0bf] leading-relaxed">
                Gereja GPIB Kota, Tanjungpinang, Kepulauan Riau
              </span>
            </div>
          </div>

          {/* Maps Button */}
          <a
            href="https://maps.google.com/?q=Gereja+GPIB+Tanjungpinang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#d8c39e]/20 border border-[#d8c39e]/40 text-[#fbf6ed] text-[11px] font-serif tracking-[0.15em] uppercase transition-all shadow-sm active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#d8c39e]" />
            <span>Petunjuk Arah (Maps)</span>
          </a>
        </motion.div>

        {/* EVENT 2: ACARA RESEPSI */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" as const }}
          className="group relative p-6 rounded-2xl bg-black/35 border border-[#d8c39e]/30 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
            <span className="text-[10px] tracking-[0.25em] uppercase font-serif text-[#d8c39e] font-semibold">
              Resepsi Pernikahan
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#ebdcc9]">
              <Calendar className="w-3.5 h-3.5 text-[#d8c39e]" />
              <span className="font-serif">24 Okt 2026</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#fbf6ed] tracking-wide mb-1">
            Ruko Agung Mentari Hills Blok B 5
          </h3>
          <p className="text-xs font-serif text-[#dcd0bf] mb-4 leading-relaxed">
            Perayaan Ramah Tamah &amp; Resepsi Pernikahan Sefrialdo &amp; Yulienci
          </p>

          {/* Time & Location */}
          <div className="space-y-2 text-xs font-serif text-[#b8a68d] mb-5">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#d8c39e]" />
              <span className="text-[#f2e7d8]">13:00 WIB &ndash; Selesai</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d8c39e] shrink-0 mt-0.5" />
              <span className="text-[#dcd0bf] leading-relaxed">
                Jln Nusantara Km 13 arah Kijang, Tanjungpinang
              </span>
            </div>
          </div>

          {/* Maps Button */}
          <a
            href="https://maps.google.com/?q=Ruko+Agung+Mentari+Hills+Tanjungpinang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#d8c39e]/20 border border-[#d8c39e]/40 text-[#fbf6ed] text-[11px] font-serif tracking-[0.15em] uppercase transition-all shadow-sm active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#d8c39e]" />
            <span>Petunjuk Arah (Maps)</span>
          </a>
        </motion.div>
      </div>

      {/* 4. Bottom Scroll Down Indicator */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" as const }}
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
