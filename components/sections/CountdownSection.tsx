"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Target: 24 October 2026 09:00 WIB
    const targetDate = new Date("2026-10-24T09:00:00+07:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveToCalendar = () => {
    const title = encodeURIComponent("The Wedding of Christian & Yulienci");
    const details = encodeURIComponent("Pemberangkatan di Gereja Kota GPIB & Resepsi di Ruko Agung Mentari Hill Blok B No. 05, Tanjungpinang.");
    const location = encodeURIComponent("Gereja Kota GPIB, Tanjungpinang, Kepulauan Riau");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261024T020000Z/20261024T140000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="countdown" className="relative w-full min-h-screen bg-gradient-to-b from-[#1c0408] via-[#2a0910] to-[#180306] text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-y border-[#d8c39e]/25 shadow-[0_0_50px_rgba(0,0,0,0.7)]">
      {/* 1. Paper Texture & Ambient Vintage Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.09)_0%,transparent_60%)]" />
      </div>

      {/* 2. Header */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-serif text-[#d8c39e] mb-1">
          Save The Date
        </p>
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          Wedding Day Countdown
        </h2>
      </motion.div>

      {/* 3. Countdown Timer Display */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
        className="relative z-10 my-auto py-6 w-full max-w-[370px] flex flex-col items-center"
      >
        {/* Date Display */}
        <p className="font-serif text-sm tracking-[0.2em] text-[#d8c39e] mb-8">
          24 . 10 . 2026
        </p>

        {/* Digit Boxes (Vintage Editorial Style) */}
        <div className="grid grid-cols-4 gap-3 w-full mb-8">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.minutes },
            { label: "SECS", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-black/40 border border-[#d8c39e]/30 shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf6ed] tracking-wider font-mono">
                {item.value}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-sans text-[#b8a68d] mt-1.5 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <button
          onClick={handleSaveToCalendar}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-[#d8c39e]/20 border border-[#d8c39e]/50 text-[#fbf6ed] text-xs font-serif tracking-[0.2em] uppercase transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#d8c39e]" />
          <span>Save To Calendar</span>
        </button>
      </motion.div>

      {/* 4. Bottom Scroll Down Indicator */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as const }}
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
