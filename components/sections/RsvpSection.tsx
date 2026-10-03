"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Send, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto pre-fill name from URL query parameter if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guestName = params.get("to") || params.get("guest") || params.get("nama");
      if (guestName) {
        setFormData((prev) => ({ ...prev, name: decodeURIComponent(guestName) }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured) {
        // 1. Insert into RSVPS table
        const { error: rsvpError } = await supabase.from("rsvps").insert([
          {
            name: formData.name.trim(),
            guests: parseInt(formData.guests) || 1,
            address: "Online RSVP",
            attending: formData.attendance === "yes" ? "Yes" : "No",
          },
        ]);

        if (rsvpError) {
          console.error("Error submitting RSVP:", rsvpError);
        }

        // 2. Also insert to WISHES table if message is provided
        if (formData.message.trim()) {
          await supabase.from("wishes").insert([
            {
              name: formData.name.trim(),
              relation: "Tamu Undangan",
              message: formData.message.trim(),
            },
          ]);
        }
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="rsvp" className="relative w-full min-h-screen bg-gradient-to-b from-[#1c0408] via-[#2a0910] to-[#180306] text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-y border-[#d8c39e]/25 shadow-[0_0_50px_rgba(0,0,0,0.7)]">
      {/* 1. Paper Texture & Ambient Vintage Sheen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.09)_0%,transparent_60%)]" />
      </div>

      {/* 2. Header (Matching ref_vintage_rsvp) */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <span className="block text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          Kindly
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#fbf6ed] tracking-[0.2em] -mt-1">
          RSVP
        </h2>
        <div className="w-12 h-[1px] bg-[#d8c39e]/50 mx-auto my-3" />
        <p className="text-xs font-serif text-[#dcd0bf] max-w-xs mx-auto leading-relaxed">
          Sebagai kehormatan bagi kami, mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i sebelum tanggal 10 Oktober 2026.
        </p>
      </motion.div>

      {/* 3. RSVP Form Box */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
        className="relative z-10 w-full max-w-[380px] my-auto py-6"
      >
        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-black/40 border border-[#d8c39e]/40 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-4 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#d8c39e]" />
            <h3 className="text-xl font-serif font-bold text-[#fbf6ed]">
              Terima Kasih!
            </h3>
            <p className="text-xs font-serif text-[#dcd0bf] leading-relaxed">
              Konfirmasi kehadiran Anda telah berhasil kami simpan. Kehadiran Anda merupakan kebahagiaan terbesar bagi kami.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-2 text-[10px] tracking-[0.2em] uppercase font-serif text-[#d8c39e] hover:underline"
            >
              Ubah Data Konfirmasi
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-black/35 border border-[#d8c39e]/30 shadow-2xl backdrop-blur-md flex flex-col gap-4 text-left"
          >
            {/* Full Name */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-serif text-[#d8c39e] mb-1.5 font-medium">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Dimas &amp; Keluarga"
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-[#d8c39e]/30 text-sm text-[#fbf6ed] placeholder-[#8c7a65] focus:outline-none focus:border-[#d8c39e] transition-colors"
              />
            </div>

            {/* Attendance Radio */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-serif text-[#d8c39e] mb-1.5 font-medium">
                Konfirmasi Kehadiran *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "yes" })}
                  className={`py-2 px-3 rounded-lg border text-xs font-serif tracking-wider transition-all ${
                    formData.attendance === "yes"
                      ? "bg-[#5c0e1a]/80 border-[#d8c39e] text-[#fbf6ed] font-medium"
                      : "bg-black/40 border-white/10 text-[#a8957c] hover:border-white/20"
                  }`}
                >
                  Ya, Akan Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "no" })}
                  className={`py-2 px-3 rounded-lg border text-xs font-serif tracking-wider transition-all ${
                    formData.attendance === "no"
                      ? "bg-[#5c0e1a]/80 border-[#d8c39e] text-[#fbf6ed] font-medium"
                      : "bg-black/40 border-white/10 text-[#a8957c] hover:border-white/20"
                  }`}
                >
                  Maaf, Tidak Bisa
                </button>
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-serif text-[#d8c39e] mb-1.5 font-medium">
                Jumlah Tamu
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-[#d8c39e]/30 text-sm text-[#fbf6ed] focus:outline-none focus:border-[#d8c39e] transition-colors cursor-pointer"
              >
                <option value="1" className="bg-[#1c080b]">1 Orang</option>
                <option value="2" className="bg-[#1c080b]">2 Orang</option>
                <option value="3" className="bg-[#1c080b]">3 Orang</option>
                <option value="4" className="bg-[#1c080b]">4 Orang atau Lebih</option>
              </select>
            </div>

            {/* Notes / Message */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-serif text-[#d8c39e] mb-1.5 font-medium">
                Pesan / Ucapan Singkat
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan ucapan atau doa singkat..."
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-[#d8c39e]/30 text-sm text-[#fbf6ed] placeholder-[#8c7a65] focus:outline-none focus:border-[#d8c39e] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-[#7a1222] to-[#540b16] hover:from-[#8f1528] hover:to-[#630d1a] border border-[#d8c39e]/60 text-xs font-serif font-semibold tracking-[0.25em] uppercase text-[#fbf6ed] shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d8c39e]" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <span>Kirim Konfirmasi</span>
                  <Send className="w-3.5 h-3.5 text-[#d8c39e]" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>

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
