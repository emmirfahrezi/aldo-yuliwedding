"use client";

import { useState } from "react";
import EnvelopeOpening from "@/components/sections/EnvelopeOpening";
import HeroSection from "@/components/sections/HeroSection";
import BibleQuoteSection from "@/components/sections/BibleQuoteSection";
import GroomBrideSection from "@/components/sections/GroomBrideSection";
import CountdownSection from "@/components/sections/CountdownSection";
import EventLocationSection from "@/components/sections/EventLocationSection";
import RsvpSection from "@/components/sections/RsvpSection";
import WeddingGiftSection from "@/components/sections/WeddingGiftSection";
import BestWishesSection from "@/components/sections/BestWishesSection";
import ThankYouFooter from "@/components/sections/ThankYouFooter";
import BottomAppBar from "@/components/ui/BottomAppBar";
import FixedBackground from "@/components/ui/FixedBackground";

export default function InvitationContainer() {
  // stages: 'cover' | 'sliding-up' | 'opened'
  const [stage, setStage] = useState<"cover" | "sliding-up" | "opened">("cover");

  const handleOpenInvitation = () => {
    if (stage !== "cover") return;

    // Step 1: Slide cover up smoothly like a curtain
    setStage("sliding-up");

    // Step 2: Unmount cover and enable full scrolling after slide finishes
    setTimeout(() => {
      setStage("opened");
    }, 1200);
  };

  const isCoverSlidUp = stage === "sliding-up" || stage === "opened";

  return (
    <>
      {/* 0. Fixed Vintage Background - Stays perfectly stationary while content scrolls */}
      <FixedBackground />

      <div
        className={`relative z-10 w-full max-w-[430px] mx-auto flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.7)] border-x border-[#d8c39e]/20 bg-transparent ${
          stage === "opened" ? "min-h-screen" : "h-screen overflow-hidden"
        }`}
      >
        {/* 1. Underlying Main Invitation Content (Rendered sequentially in dedicated full sections) */}
        <div className="relative z-10 w-full flex flex-col pb-20">
        {/* Section 1: Hero Opening Nama Mempelai */}
        <HeroSection />

        {/* Section 2: Ayat Alkitab / Firman Tuhan & Cincin Vintage */}
        <BibleQuoteSection />

        {/* Section 3: Pengenalan Kedua Mempelai (The Groom & The Bride) */}
        <GroomBrideSection />

        {/* Section 4: Countdown Timer */}
        <CountdownSection />

        {/* Section 5: Tempat & Waktu Acara (Pemberangkatan & Resepsi) */}
        <EventLocationSection />

        {/* Section 6: Kindly RSVP Form */}
        <RsvpSection />

        {/* Section 7: Wedding Gift (Tanda Kasih Digital / Amplop) */}
        <WeddingGiftSection />

        {/* Section 8: Best Wishes & Doa Restu */}
        <BestWishesSection />

        {/* Section 9: Thank You Footer (Layout persis screenshot 3) */}
        <ThankYouFooter />
      </div>

      {/* 2. Floating Bottom App Bar Navigation Dock */}
      <BottomAppBar isVisible={stage === "opened"} />

      {/* 3. Slide-up Luxury Cover (Matches wedding-selvidimas smooth transition) */}
      {stage !== "opened" && (
        <div
          className={`fixed inset-0 z-50 flex justify-center overflow-hidden transition-transform duration-[1150ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isCoverSlidUp
              ? "-translate-y-full pointer-events-none"
              : "translate-y-0 pointer-events-auto"
          }`}
        >
          <div className="relative w-full max-w-[430px] h-full shadow-[0_0_80px_rgba(0,0,0,0.95)] border-x border-[#d8c39e]/20">
            <EnvelopeOpening onOpen={handleOpenInvitation} />
          </div>
        </div>
      )}
      </div>
    </>
  );
}
