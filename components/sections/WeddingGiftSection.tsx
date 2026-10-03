"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, Check, ChevronDown, MapPin } from "lucide-react";

export default function WeddingGiftSection() {
  const [isOpen, setIsOpen] = useState(false);
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

      {/* 3. Gift Dropdown / Accordion Trigger & Luxury VIP Cards */}
      <div className="relative z-10 w-full max-w-[390px] flex flex-col items-center my-auto py-4">
        {/* Ornate Royal Gift Emblem */}
        <motion.div
          {...fadeInUp}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d8c39e]/40 bg-black/45 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(216,195,158,0.22)] mx-auto mb-4"
        >
          {/* Ambient pulsing aura */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.25)_0%,transparent_70%)] animate-pulse" />
          <Gift className="w-7 h-7 sm:w-9 sm:h-9 text-[#ebd896] drop-shadow-[0_2px_8px_rgba(216,195,158,0.5)]" />
        </motion.div>

        {/* Heartfelt Note & Feature Badges */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1, duration: 0.85, ease: "easeOut" as const }}
          className="w-full max-w-[360px] p-4 sm:p-5 rounded-2xl bg-black/35 border border-[#d8c39e]/30 backdrop-blur-md text-center shadow-lg mb-5"
        >
          <p className="font-serif text-xs sm:text-[13px] text-[#f2e7d8] leading-relaxed mb-3">
            &ldquo;Kehadiran dan doa restu Anda adalah karunia terbaik bagi kami. Tanpa mengurangi rasa hormat, bagi keluarga &amp; sahabat yang bermaksud memberikan tanda kasih, dapat melalui fasilitas di bawah ini.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-2 pt-2.5 border-t border-white/10 text-[10px] sm:text-[11px] font-serif text-[#ebd896]">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-[#d8c39e]/30 shadow-xs">
              💳 Rekening BCA
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-[#d8c39e]/30 shadow-xs">
              🎁 Kado Fisik
            </span>
          </div>
        </motion.div>

        {/* Trigger Button */}
        <motion.button
          {...fadeInUp}
          transition={{ delay: 0.15, duration: 0.85, ease: "easeOut" as const }}
          onClick={() => setIsOpen(!isOpen)}
          className="group relative px-7 py-3 rounded-full bg-gradient-to-r from-[#500c16] via-[#751322] to-[#500c16] hover:from-[#65101d] hover:to-[#65101d] border border-[#d8c39e]/60 text-[#fbf6ed] text-xs sm:text-sm font-serif tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.65),0_0_18px_rgba(216,195,158,0.2)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
        >
          <Gift className="w-4 h-4 text-[#ebd896] group-hover:scale-110 transition-transform" />
          <span className="font-medium text-[#fbf6ed]">
            {isOpen ? "Tutup Amplop Digital" : "Buka Amplop Digital"}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#ebd896]" />
          </motion.div>
        </motion.button>

        {/* Dropdown Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center gap-4 overflow-hidden pt-6"
            >
              {/* --- LUXURY VIP BANK CARD (BCA) --- */}
              <div className="relative w-full aspect-[1.58/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#2c0912] via-[#1a0408] to-[#0c0204] border border-[#d8c39e]/50 shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(216,195,158,0.15)] flex flex-col justify-between overflow-hidden text-left">
                {/* Decorative Metallic Wave / Pattern Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-[#d8c39e]/40" />
                  <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-[#d8c39e]/30" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(216,195,158,0.18)_0%,transparent_65%)]" />
                </div>

                {/* Card Top: Chip + Bank Name */}
                <div className="relative z-10 flex items-center justify-between">
                  {/* EMV Gold Chip Icon */}
                  <div className="w-10 sm:w-11 h-7 sm:h-8 rounded-md bg-gradient-to-br from-[#ebd392] via-[#c69a3b] to-[#8f6d21] p-[1px] shadow-sm">
                    <div className="w-full h-full rounded-[5px] bg-[#1a0408]/40 border border-[#fff2c6]/60 flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-[1px] bg-[#ebd392]/70 absolute top-1/3" />
                      <div className="w-full h-[1px] bg-[#ebd392]/70 absolute bottom-1/3" />
                      <div className="h-full w-[1px] bg-[#ebd392]/70 absolute left-1/2" />
                    </div>
                  </div>

                  {/* Bank Brand */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#fbf6ed] tracking-[0.2em]">
                      BCA
                    </span>
                    <span className="text-[10px] text-[#ebd896] font-sans tracking-widest uppercase opacity-80">
                      Digital
                    </span>
                  </div>
                </div>

                {/* Card Middle: Account Number */}
                <div className="relative z-10 my-auto py-1">
                  <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.25em] text-[#a8957c]">
                    Nomor Rekening
                  </span>
                  <p className="font-mono text-xl sm:text-2xl font-bold tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#faeed1] to-[#dfb858] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-0.5">
                    8890 8786 37
                  </p>
                </div>

                {/* Card Bottom: Cardholder Name & Copy Button */}
                <div className="relative z-10 flex items-end justify-between gap-2 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[8px] sm:text-[9px] uppercase font-sans tracking-[0.2em] text-[#a8957c] block">
                      Atas Nama
                    </span>
                    <span className="font-serif font-semibold text-xs sm:text-sm text-[#fbf6ed] tracking-wider uppercase">
                      Christian Alfan
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy("8890878637", "bca")}
                    className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.1] hover:bg-[#d8c39e]/25 border border-[#d8c39e]/50 text-[10px] sm:text-xs font-serif tracking-[0.15em] uppercase text-[#fbf6ed] flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shrink-0"
                  >
                    {copiedId === "bca" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#ebd896]" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* --- PHYSICAL GIFT ADDRESS CARD --- */}
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/40 border border-[#d8c39e]/25 shadow-lg backdrop-blur-md text-left relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#ebd896]">
                    <MapPin className="w-3.5 h-3.5 text-[#d8c39e]" />
                    <span>Kirim Kado Fisik (Alamat)</span>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        "Jl. Nusantara, Ruko Agung Mentari Hill, Blok B No. 05, Km. 13 (Arah Kijang), Tanjungpinang, Kepulauan Riau (29125) - Penerima: Christian (0812-3456-7890)",
                        "address"
                      )
                    }
                    className="px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-[#d8c39e]/20 border border-[#d8c39e]/40 text-[9px] font-serif tracking-wider uppercase text-[#fbf6ed] flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedId === "address" ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        <span className="text-emerald-300">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5 text-[#ebd896]" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-serif text-[#dcd0bf] leading-relaxed mt-2">
                  Jl. Nusantara, Ruko Agung Mentari Hill, Blok B No. 05, Km. 13 (Arah Kijang), Tanjungpinang, Kepulauan Riau (29125)
                </p>
                <p className="text-[11px] text-[#a8957c] font-serif mt-1.5">
                  Penerima: Christian (0812-3456-7890)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
