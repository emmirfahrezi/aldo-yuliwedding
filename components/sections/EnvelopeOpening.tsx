"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isCardSlidOut, setIsCardSlidOut] = useState(false);
  const [guestName, setGuestName] = useState("Bapak / Ibu / Saudara/i");

  // Read guest name from URL query parameter (e.g. ?to=Nama atau ?id=<uuid>)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("guest") || params.get("u") || params.get("nama");
    const id = params.get("id");

    if (to) {
      setGuestName(decodeURIComponent(to));
    } else if (id && isSupabaseConfigured) {
      // Lookup personalized guest from Supabase guests table
      supabase
        .from("guests")
        .select("name")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          if (data?.name) {
            setGuestName(data.name);
          }
        });
    }
  }, []);

  const handleTap = () => {
    if (!isCardSlidOut) {
      // Step 1: Slide out the letter card from the envelope
      setIsCardSlidOut(true);
    } else {
      // Step 2: Open the invitation
      onOpen();
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-full overflow-hidden select-none bg-[#140205] cursor-pointer flex items-center justify-center"
      onClick={handleTap}
    >
      {/* Full width stage - Expands edge-to-edge on mobile phones with zero side gaps */}
      <div 
        className="relative w-full h-full flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.95)]"
      >
        {/* 1. Master Background Artwork (Cleaned burgundy velvet canvas) */}
        <img
          src="/images/full_invitation_cover.webp"
          alt="The Wedding of Christian & Yulienci"
          decoding="async"
          className="w-full h-full object-fill pointer-events-none select-none"
        />



        {/* 2. Royal Letter Card (Slides out proportionally above envelope pocket) */}
        <motion.div
          initial={{ y: 0, opacity: 0, scale: 0.95 }}
          animate={
            isCardSlidOut
              ? { y: "-102%", opacity: 1, scale: 1 }
              : { y: 0, opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute top-[50.4%] left-1/2 -translate-x-1/2 w-[76%] max-w-[290px] aspect-[290/220] bg-[#faf7f2] rounded-xs shadow-[0_20px_45px_rgba(0,0,0,0.95)] border border-[#d4af37]/80 flex flex-col items-center justify-between p-2 sm:p-2.5 text-center ${
            isCardSlidOut ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ zIndex: 15 }}
        >
          {/* Inner Gold Frame */}
          <div className="w-full h-full border border-[#d4af37]/45 rounded-xs p-1.5 sm:p-2 flex flex-col items-center justify-between bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(248,243,234,1)_100%)] shadow-inner">
            {/* Header */}
            <div>
              <p className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#7a0016] font-serif font-semibold">
                Walimatul &apos;Urs
              </p>
              <h3 className="text-base sm:text-lg font-[family-name:var(--font-script-vibes)] text-[#7a0016] my-0.5 leading-tight">
                Christian &amp; Yulienci
              </h3>
              <div className="w-8 h-[1px] bg-[#d4af37] mx-auto my-0.5 opacity-70" />
            </div>

            {/* Guest Recipient Section */}
            <div className="flex flex-col items-center my-auto py-0.5">
              <span className="text-[9px] sm:text-[10px] text-[#8a7258] italic font-serif">
                Dear;
              </span>
              <span className="text-xs sm:text-[13px] font-serif font-semibold text-[#3b1219] tracking-wide mt-0.5 max-w-[190px] px-2 truncate">
                {guestName}
              </span>
              <p className="text-[7.5px] sm:text-[8px] text-[#777] font-serif tracking-wider uppercase mt-0.5">
                Tamu Undangan
              </p>
            </div>

            {/* Open Invitation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="group relative px-3.5 sm:px-4 py-1.5 bg-[#7a0016] hover:bg-[#8f001a] text-[#fbf1c7] rounded-xs text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase font-serif font-medium border border-[#d4af37]/70 shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer mt-0.5"
            >
              <span>Buka Undangan</span>
              <svg
                className="w-3 h-3 text-[#d4af37] group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* 3. Luxury Envelope (Fixed natural aspect ratio 1055:712 so it NEVER stretches or distorts) */}
        <div
          className="absolute top-[50.4%] left-1/2 -translate-x-1/2 w-[91.5%] aspect-[1055/712] pointer-events-none"
          style={{ zIndex: 20 }}
        >
          <img
            src="/images/envelope_exact.webp"
            alt="Royal Envelope Front"
            className="w-full h-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
          />

          {/* 4. Interactive Pulsing Golden Glow over Wax Seal (Dead center on seal) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={
                isCardSlidOut
                  ? { opacity: 0 }
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.35, 0.75, 0.35],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-[radial-gradient(circle,rgba(255,230,150,0.65)_0%,rgba(212,175,55,0.25)_50%,transparent_75%)]"
            />
          </div>

          {/* 5. Golden Light Burst Flare on Tap */}
          <AnimatePresence>
            {isCardSlidOut && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2.8, opacity: [0, 0.95, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 h-28 sm:h-32 rounded-full pointer-events-none"
                style={{
                  zIndex: 30,
                  background:
                    "radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,225,120,0.75)_40%,transparent_70%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* 6. Subtle Shimmer across the Cover */}
        <motion.div
          animate={{
            x: ["-120%", "220%"],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          style={{ zIndex: 5 }}
        />
      </div>
    </div>
  );
}
