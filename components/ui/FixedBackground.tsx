export default function FixedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
      <div className="relative w-full max-w-[430px] h-full bg-[#190508] shadow-[0_0_80px_rgba(0,0,0,0.95)] border-x border-[#d8c39e]/20">
        {/* Cinematic Vintage Background Image (Hands & Rings with Candlelit Bokeh) */}
        <img
          src="/images/vintage_hero_bg.webp"
          alt="Vintage Background"
          decoding="async"
          className="w-full h-full object-cover object-top opacity-45"
        />
        {/* Deep Chocolate-Burgundy Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a060a]/90 via-[#230b10]/75 to-[#160407]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(18,4,7,0.85)_100%)]" />

        {/* Subtle Ambient Radial Glows (Pure gradient falloff, zero-cost GPU compositing) */}
        <div className="absolute top-1/4 -right-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.07)_0%,transparent_60%)]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(180,30,50,0.1)_0%,transparent_60%)]" />
      </div>
    </div>
  );
}

