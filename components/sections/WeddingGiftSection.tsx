"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, ChevronDown, MapPin } from "lucide-react";

export default function WeddingGiftSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="gift" className="relative w-full min-h-screen bg-transparent text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-t border-white/10">
      {/* 1. Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.08)_0%,transparent_60%)]" />
      </div>

      {/* 2. Header (Matching ref_vintage_middle) */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-serif text-[#d8c39e] mb-1">
          Wedding Registry
        </p>
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          A Note on Gifts
        </h2>
        <div className="w-12 h-[1px] bg-[#d8c39e]/50 mx-auto my-3" />
        <p className="text-xs font-serif text-[#dcd0bf] max-w-xs mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat melalui:
        </p>
      </motion.div>

      {/* 3. Gift Bank Cards & Physical Address */}
      <div className="relative z-10 w-full max-w-[380px] flex flex-col gap-4 my-auto py-6">
        
        {/* BANK BCA */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
          className="p-5 rounded-2xl bg-black/40 border border-[#d8c39e]/30 shadow-xl backdrop-blur-md text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-serif font-bold text-[#d8c39e] tracking-wider uppercase">
              BANK BCA
            </span>
            <Gift className="w-4 h-4 text-[#d8c39e]/70" />
          </div>

          <p className="font-mono text-xl sm:text-2xl font-bold text-[#fbf6ed] tracking-wider my-1">
            8890878637
          </p>
          <p className="text-xs font-serif text-[#b8a68d] mb-4">
            a.n. Sefrialdo Christian Alfan
          </p>

          <button
            onClick={() => handleCopy("8890878637", "bca")}
            className="w-full py-2 px-4 rounded-full bg-white/[0.08] hover:bg-[#d8c39e]/20 border border-[#d8c39e]/40 text-xs font-serif tracking-[0.15em] uppercase text-[#fbf6ed] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            {copiedId === "bca" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Tersalin ke Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#d8c39e]" />
                <span>Salin No. Rekening</span>
              </>
            )}
          </button>
        </motion.div>

        {/* BANK MANDIRI */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" as const }}
          className="p-5 rounded-2xl bg-black/40 border border-[#d8c39e]/30 shadow-xl backdrop-blur-md text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-serif font-bold text-[#d8c39e] tracking-wider uppercase">
              BANK MANDIRI
            </span>
            <Gift className="w-4 h-4 text-[#d8c39e]/70" />
          </div>

          <p className="font-mono text-xl sm:text-2xl font-bold text-[#fbf6ed] tracking-wider my-1">
            1090018899221
          </p>
          <p className="text-xs font-serif text-[#b8a68d] mb-4">
            a.n. Yulienci Refi Anggraini
          </p>

          <button
            onClick={() => handleCopy("1090018899221", "mandiri")}
            className="w-full py-2 px-4 rounded-full bg-white/[0.08] hover:bg-[#d8c39e]/20 border border-[#d8c39e]/40 text-xs font-serif tracking-[0.15em] uppercase text-[#fbf6ed] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            {copiedId === "mandiri" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Tersalin ke Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#d8c39e]" />
                <span>Salin No. Rekening</span>
              </>
            )}
          </button>
        </motion.div>

        {/* PHYSICAL GIFT ADDRESS */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" as const }}
          className="p-4 rounded-2xl bg-black/30 border border-white/10 text-left"
        >
          <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#d8c39e] mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kirim Kado Fisik</span>
          </div>
          <p className="text-xs font-serif text-[#dcd0bf] leading-relaxed">
            Ruko Agung Mentari Hills Blok B 5, Jln Nusantara Km 13 arah Kijang, Tanjungpinang, Kepulauan Riau (29125)
          </p>
          <p className="text-[11px] text-[#9c8973] font-serif mt-1">
            Penerima: Sefrialdo / Yulienci (0812-3456-7890)
          </p>
        </motion.div>
      </div>

      {/* 4. Bottom Scroll Down Indicator */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" as const }}
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
