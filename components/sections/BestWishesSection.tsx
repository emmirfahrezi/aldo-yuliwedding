"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Heart, ChevronDown, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Wish {
  id: string | number;
  name: string;
  relation: string;
  message: string;
  time: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: "1",
    name: "Christian & Brenda",
    relation: "Sahabat",
    message: "Selamat menempuh hidup baru untuk Aldo dan Yulienci! Kiranya kasih Kristus senantiasa menyertai dan memberkati rumah tangga kalian sampai maut memisahkan. Amin!",
    time: "2 jam lalu",
  },
  {
    id: "2",
    name: "Keluarga Besar Situmorang",
    relation: "Keluarga",
    message: "Happy Wedding Sefrialdo & Yulienci! Semoga menjadi keluarga yang takut akan Tuhan, rukun, bahagia, dan selalu dipenuhi damai sejahtera.",
    time: "5 jam lalu",
  },
  {
    id: "3",
    name: "Sarah Amanda",
    relation: "Rekan Kerja",
    message: "Congratulations on your special day! So happy for both of you. Wishing you a lifetime of love and happiness together!",
    time: "1 hari lalu",
  },
];

export default function BestWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>(DEFAULT_WISHES);
  const [form, setForm] = useState({ name: "", relation: "Sahabat", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Fetch wishes from Supabase & Listen to Realtime updates
  useEffect(() => {
    // Pre-fill name from URL parameter if available
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guestName = params.get("to") || params.get("guest") || params.get("nama");
      if (guestName) {
        setForm((prev) => ({ ...prev, name: decodeURIComponent(guestName) }));
      }
    }

    if (!isSupabaseConfigured) return;

    // Fetch existing wishes from DB
    supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (!error && data) {
          const formatted: Wish[] = data.map((item) => ({
            id: item.id,
            name: item.name,
            relation: item.relation || "Sahabat",
            message: item.message,
            time: new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            }),
          }));
          setWishes(formatted);
        }
      });

    // Subscribe to realtime new wishes via Supabase websocket
    const channel = supabase
      .channel("public:wishes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          const newWish: Wish = {
            id: payload.new.id,
            name: payload.new.name,
            relation: payload.new.relation || "Sahabat",
            message: payload.new.message,
            time: "Baru saja",
          };
          setWishes((prev) => [newWish, ...prev.filter((w) => w.id !== newWish.id)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setIsSubmitting(true);

    const tempId = Date.now().toString();
    const newWish: Wish = {
      id: tempId,
      name: form.name.trim(),
      relation: form.relation,
      message: form.message.trim(),
      time: "Baru saja",
    };

    // Optimistic UI update
    setWishes((prev) => [newWish, ...prev]);

    try {
      if (isSupabaseConfigured) {
        await supabase.from("wishes").insert([
          {
            name: form.name.trim(),
            relation: form.relation,
            message: form.message.trim(),
          },
        ]);
      }
    } catch (err) {
      console.error("Error submitting wish:", err);
    } finally {
      setIsSubmitting(false);
      setForm({ name: "", relation: "Sahabat", message: "" });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  return (
    <section id="wishes" className="relative w-full min-h-screen bg-gradient-to-b from-[#1c0408] via-[#2a0910] to-[#180306] text-[#f7f2ea] px-6 py-16 flex flex-col justify-between items-center text-center overflow-hidden select-none border-y border-[#d8c39e]/25 shadow-[0_0_50px_rgba(0,0,0,0.7)]">
      {/* 1. Paper Texture & Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(216,195,158,0.09)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* 2. Header */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 pt-4"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-serif text-[#d8c39e] mb-1">
          Prayers &amp; Wishes
        </p>
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-script)] sm:font-[family-name:var(--font-script-vibes)] text-[#fbf6ed] tracking-wide">
          Best Wishes
        </h2>
        <div className="w-12 h-[1px] bg-[#d8c39e]/50 mx-auto my-3" />
        <p className="text-xs font-serif text-[#dcd0bf] max-w-xs mx-auto leading-relaxed">
          Tuliskan doa restu dan pesan hangat Anda untuk kedua mempelai:
        </p>
      </motion.div>

      {/* 3. Form and Wishes List */}
      <div className="relative z-10 w-full max-w-[380px] flex flex-col gap-5 my-auto py-6">
        
        {/* Form */}
        <motion.form
          {...fadeInUp}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" as const }}
          onSubmit={handleSubmit}
          className="p-5 rounded-2xl bg-black/40 border border-[#d8c39e]/30 shadow-xl backdrop-blur-md flex flex-col gap-3 text-left"
        >
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama Anda"
              className="px-3.5 py-2 rounded-lg bg-black/40 border border-[#d8c39e]/30 text-xs text-[#fbf6ed] placeholder-[#8c7a65] focus:outline-none focus:border-[#d8c39e] transition-colors"
            />
            <select
              value={form.relation}
              onChange={(e) => setForm({ ...form, relation: e.target.value })}
              className="px-3 py-2 rounded-lg bg-black/40 border border-[#d8c39e]/30 text-xs text-[#fbf6ed] focus:outline-none focus:border-[#d8c39e] transition-colors cursor-pointer"
            >
              <option value="Keluarga" className="bg-[#1c080b]">Keluarga</option>
              <option value="Sahabat" className="bg-[#1c080b]">Sahabat</option>
              <option value="Teman Kerja" className="bg-[#1c080b]">Teman Kerja</option>
              <option value="Tamu Undangan" className="bg-[#1c080b]">Tamu Undangan</option>
            </select>
          </div>

          <textarea
            required
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tuliskan ucapan dan doa restu..."
            className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-[#d8c39e]/30 text-xs text-[#fbf6ed] placeholder-[#8c7a65] focus:outline-none focus:border-[#d8c39e] transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#7a1222] to-[#540b16] hover:from-[#8f1528] hover:to-[#630d1a] border border-[#d8c39e]/50 text-xs font-serif tracking-[0.2em] uppercase text-[#fbf6ed] shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d8c39e]" />
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <span>Kirim Ucapan</span>
                <Send className="w-3.5 h-3.5 text-[#d8c39e]" />
              </>
            )}
          </button>

          {isSuccess && (
            <p className="text-center text-[11px] font-serif text-emerald-400 animate-fadeIn">
              Ucapan Anda berhasil dikirim! Terima kasih.
            </p>
          )}
        </motion.form>

        {/* Wishes List (Scrollable box) */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" as const }}
          className="max-h-[260px] overflow-y-auto space-y-2.5 pr-1 text-left"
        >
          {wishes.length === 0 ? (
            <div className="p-5 rounded-xl bg-black/30 border border-white/10 text-center flex flex-col items-center justify-center gap-1.5 py-8">
              <MessageSquare className="w-5 h-5 text-[#d8c39e]/50 mb-1" />
              <p className="text-xs font-serif text-[#ebdcc9]">
                Belum ada doa dan ucapan.
              </p>
              <span className="text-[10px] font-serif text-[#9c8973]">
                Jadilah yang pertama memberikan doa restu di atas!
              </span>
            </div>
          ) : (
            wishes.map((w) => (
              <div
                key={w.id}
                className="p-3.5 rounded-xl bg-black/30 border border-white/10 backdrop-blur-xs flex flex-col gap-1 text-left"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[#fbf6ed] tracking-wide">
                    {w.name}
                  </span>
                  <span className="text-[10px] text-[#9c8973] font-serif">
                    {w.time}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-serif text-[#d8c39e]">
                  {w.relation}
                </span>
                <p className="text-xs font-serif text-[#dcd0bf] leading-relaxed mt-0.5">
                  {w.message}
                </p>
              </div>
            ))
          )}
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
