"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isCardSlidOut, setIsCardSlidOut] = useState(false);
  const [guestName, setGuestName] = useState("Bapak / Ibu / Saudara/i");
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageDimensions, setStageDimensions] = useState<{ width: number; height: number } | null>(null);

  // Dynamically calculate exact COVER aspect ratio (1152:2558)
  // Ensures the cover completely fills 100% of any phone resolution (zero empty bars / zero letterboxing)
  // while strictly locking aspect ratio so elements never get gepeng / distorted.
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (!clientWidth || !clientHeight) return;

      const targetRatio = 1152 / 2558;
      // Fit completely within container without any cropping on any phone:
      let h = clientHeight;
      let w = Math.round(h * targetRatio);

      if (w > clientWidth) {
        w = clientWidth;
        h = Math.round(w / targetRatio);
      }

      setStageDimensions({ width: w, height: h });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
      ref={containerRef}
      className="relative w-full h-full min-h-full overflow-hidden select-none bg-[#140205] cursor-pointer flex items-center justify-center"
      onClick={handleTap}
    >
      {/* Ratio-locked Stage (Fits 100% within viewport, zero cropping, zero stretching) */}
      <div 
        className="relative flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.95)]"
        style={{
          width: stageDimensions ? `${stageDimensions.width}px` : "auto",
          height: stageDimensions ? `${stageDimensions.height}px` : "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          aspectRatio: "1152 / 2558",
        }}
      >
        {/* 1. Master Background Artwork (Cleaned burgundy velvet canvas) */}
        <img
          src="/images/full_invitation_cover.webp"
          alt="The Wedding of Christian & Yuli"
          decoding="async"
          className="w-full h-full object-fill pointer-events-none select-none"
        />



        {/* 2. Royal Letter Card (Slides out proportionally above envelope pocket) */}
        <motion.div
          initial={{ y: 0, opacity: 0, scale: 0.95 }}
          animate={
            isCardSlidOut
              ? { y: "-118%", opacity: 1, scale: 1 }
              : { y: 0, opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute top-[46.2%] left-1/2 -translate-x-1/2 w-[83%] aspect-[285/235] bg-[#faf7f2] rounded-xs shadow-[0_20px_45px_rgba(0,0,0,0.95)] border border-[#d4af37]/80 flex flex-col items-center justify-between p-2.5 sm:p-3 text-center ${
            isCardSlidOut ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ zIndex: 15 }}
        >
          {/* Inner Gold Frame */}
          <div className="w-full h-full border border-[#d4af37]/45 rounded-xs p-2 flex flex-col items-center justify-between bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(248,243,234,1)_100%)] shadow-inner">
            {/* Header */}
            <div>
              <p className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#7a0016] font-serif font-semibold">
                Walimatul &apos;Urs
              </p>
              <h3 className="text-lg sm:text-xl font-[family-name:var(--font-script-vibes)] text-[#7a0016] my-0.5 leading-tight">
                Christian &amp; Yuli
              </h3>
              <div className="w-10 h-[1px] bg-[#d4af37] mx-auto my-0.5 opacity-70" />
            </div>

            {/* Guest Recipient Section */}
            <div className="flex flex-col items-center my-auto py-0.5">
              <span className="text-[10px] sm:text-[11px] text-[#8a7258] italic font-serif">
                Dear;
              </span>
              <span className="text-xs sm:text-sm font-serif font-semibold text-[#3b1219] tracking-wide mt-0.5 max-w-[210px] px-2 truncate">
                {guestName}
              </span>
              <p className="text-[8px] sm:text-[9px] text-[#777] font-serif tracking-wider uppercase mt-0.5">
                Tamu Undangan
              </p>
            </div>

            {/* Open Invitation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="group relative px-4 sm:px-5 py-1.5 sm:py-2 bg-[#7a0016] hover:bg-[#8f001a] text-[#fbf1c7] rounded-xs text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-serif font-medium border border-[#d4af37]/70 shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer mt-0.5"
            >
              <span>Buka Undangan</span>
              <svg
                className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* 3. Front Envelope Overlay (Ratio-locked to 1055:712 so the flap and wax seal NEVER distort) */}
        <div
          className="absolute top-[46.13%] left-[4.21%] w-[91.58%] aspect-[1055/712] pointer-events-none"
          style={{ zIndex: 20 }}
        >
          <img
            src="/images/envelope_exact.webp"
            alt="Royal Envelope Front"
            className="w-full h-full object-fill drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
          />
        </div>

        {/* 4. Interactive Pulsing Golden Glow over Wax Seal */}
        <div
          className="absolute top-[62.27%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 25 }}
        >
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
              className="absolute top-[62.27%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 h-28 sm:h-32 rounded-full pointer-events-none"
              style={{
                zIndex: 30,
                background:
                  "radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,225,120,0.75)_40%,transparent_70%)",
              }}
            />
          )}
        </AnimatePresence>

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
