"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Share2, 
  Copy, 
  Search, 
  Trash2, 
  Download, 
  ArrowLeft, 
  Lock, 
  KeyRound, 
  RefreshCw,
  Plus,
  UtensilsCrossed,
  Check
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Guest {
  id: string;
  name: string;
  slug?: string;
  created_at: string;
}

interface Rsvp {
  id: string;
  name: string;
  guests: number;
  address?: string;
  attending: "Yes" | "No";
  created_at: string;
}

interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  // Authentication PIN (Default wedding date PIN: 151026, 241026, or 1234)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'guests' | 'rsvps' | 'wishes'
  const [activeTab, setActiveTab] = useState<"guests" | "rsvps" | "wishes">("guests");

  // Data states
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  // New Guest Form State
  const [newGuestName, setNewGuestName] = useState("");
  const [isAddingGuest, setIsAddingGuest] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [rsvpFilter, setRsvpFilter] = useState<"all" | "yes" | "no">("all");

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Check saved PIN session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("wedding_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // 2. Fetch all data from Supabase
  const fetchData = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);

    try {
      const [guestsRes, rsvpsRes, wishesRes] = await Promise.all([
        supabase.from("guests").select("*").order("created_at", { ascending: false }),
        supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
        supabase.from("wishes").select("*").order("created_at", { ascending: false }),
      ]);

      if (guestsRes.data) setGuests(guestsRes.data);
      if (rsvpsRes.data) setRsvps(rsvpsRes.data);
      if (wishesRes.data) setWishes(wishesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Handle PIN verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PINs: 151026 (Wedding date), 241026, or 1234
    if (pinInput === "151026" || pinInput === "241026" || pinInput === "1234" || pinInput === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("wedding_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Add Guest to DB
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    setIsAddingGuest(true);
    const slug = newGuestName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const { data, error } = await supabase
        .from("guests")
        .insert([{ name: newGuestName.trim(), slug }])
        .select()
        .single();

      if (error) {
        alert("Gagal menambah tamu: " + error.message);
      } else if (data) {
        setGuests([data, ...guests]);
        setNewGuestName("");
      }
    } catch (err) {
      console.error("Error adding guest:", err);
      alert("Terjadi kesalahan saat menambah tamu.");
    } finally {
      setIsAddingGuest(false);
    }
  };

  // Delete Guest
  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Hapus tamu ini dari daftar undangan?")) return;
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus tamu: " + error.message);
    } else {
      setGuests(guests.filter((g) => g.id !== id));
    }
  };

  // Delete RSVP
  const handleDeleteRsvp = async (id: string) => {
    if (!confirm("Hapus data konfirmasi ini?")) return;
    const { error } = await supabase.from("rsvps").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus RSVP: " + error.message);
    } else {
      setRsvps(rsvps.filter((r) => r.id !== id));
    }
  };

  // Delete Wish
  const handleDeleteWish = async (id: string) => {
    if (!confirm("Hapus ucapan ini?")) return;
    const { error } = await supabase.from("wishes").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus ucapan: " + error.message);
    } else {
      setWishes(wishes.filter((w) => w.id !== id));
    }
  };

  // Generate invitation link for a guest
  const getGuestInvitationUrl = (guest: Guest) => {
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    return `${origin}/?to=${encodeURIComponent(guest.name)}&id=${guest.id}`;
  };

  // Copy link helper
  const handleCopyLink = (guest: Guest) => {
    const url = getGuestInvitationUrl(guest);
    navigator.clipboard.writeText(url);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // WhatsApp share template
  const handleShareWhatsApp = (guest: Guest) => {
    const url = getGuestInvitationUrl(guest);
    const text = 
`Yth. ${guest.name},

Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami:

💍 Christian & Yulienci
📅 Kamis, 15 Oktober 2026
📍 Tanjungpinang, Kepulauan Riau

Undangan digital personal dapat diakses melalui tautan berikut:
${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Terima kasih.`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  // Export RSVPs to CSV
  const handleExportCsv = () => {
    if (rsvps.length === 0) {
      alert("Belum ada data RSVP untuk diekspor.");
      return;
    }

    const headers = ["Nama Tamu", "Kehadiran", "Jumlah Tamu", "Alamat / Catatan", "Waktu Konfirmasi"];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      r.attending === "Yes" ? "Hadir" : "Tidak Hadir",
      r.guests,
      `"${(r.address || "").replace(/"/g, '""')}"`,
      new Date(r.created_at).toLocaleString("id-ID"),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rekap_rsvp_christian_yulienci_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for summary stats
  const totalGuests = guests.length;
  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attending === "Yes");
  const notAttendingRsvps = rsvps.filter((r) => r.attending === "No");
  const totalPaxAttending = attendingRsvps.reduce((acc, r) => acc + (r.guests || 1), 0);
  const totalWishes = wishes.length;

  // Filtered lists
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [guests, searchQuery]);

  const filteredRsvps = useMemo(() => {
    return rsvps.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (rsvpFilter === "yes") return matchSearch && r.attending === "Yes";
      if (rsvpFilter === "no") return matchSearch && r.attending === "No";
      return matchSearch;
    });
  }, [rsvps, searchQuery, rsvpFilter]);

  const filteredWishes = useMemo(() => {
    return wishes.filter(
      (w) =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [wishes, searchQuery]);

  // If not authenticated, render Passcode Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#140306] flex items-center justify-center p-4 text-[#f7f2ea] select-none">
        <div className="w-full max-w-sm p-8 rounded-2xl bg-black/60 border border-[#d8c39e]/40 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full border border-[#d8c39e]/50 flex items-center justify-center mb-4 bg-[#5c0e1a]/40 shadow-[0_0_20px_rgba(216,195,158,0.25)]">
            <Lock className="w-6 h-6 text-[#d8c39e]" />
          </div>

          <h1 className="text-xl font-serif font-bold text-[#fbf6ed] tracking-wide">
            Wedding Admin
          </h1>
          <p className="text-xs font-serif text-[#c9b79b] mt-1 mb-6">
            Christian &amp; Yulienci
          </p>

          <form onSubmit={handlePinSubmit} className="w-full space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Masukkan PIN Admin"
                className="w-full px-4 py-3 text-center tracking-[0.5em] text-lg rounded-xl bg-black/50 border border-[#d8c39e]/40 text-[#fbf6ed] placeholder-[#7d6954] focus:outline-none focus:border-[#d8c39e]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 font-serif">
                  PIN salah! Coba tanggal pernikahan: 151026
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#7a1222] to-[#540b16] hover:from-[#8f1528] hover:to-[#630d1a] border border-[#d8c39e]/60 text-xs font-serif font-semibold tracking-[0.2em] uppercase text-[#fbf6ed] shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-[#d8c39e]" />
              <span>Buka Dashboard</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#a8957c] hover:text-[#d8c39e] pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Undangan</span>
            </Link>
          </form>
        </div>
      </main>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <main className="min-h-screen w-full bg-[#120306] text-[#f7f2ea] flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-[#d8c39e]/20 bg-black/75 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#d8c39e] transition-colors"
            title="Lihat Undangan"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-[#fbf6ed] tracking-wide flex items-center gap-2">
              <span>Christian &amp; Yulienci</span>
              <span className="text-[10px] uppercase tracking-wider font-sans px-2 py-0.5 rounded-full bg-[#7a1222]/80 border border-[#d8c39e]/40 text-[#fbf6ed]">
                Admin Panel
              </span>
            </h1>
            <p className="text-[11px] font-serif text-[#a8957c] hidden sm:block">
              Manajemen Tamu, Konfirmasi Kehadiran &amp; Doa Restu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-lg bg-white/5 hover:bg-[#d8c39e]/20 border border-white/10 text-[#ebdcc9] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-serif"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#d8c39e]" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => {
              sessionStorage.removeItem("wedding_admin_auth");
              setIsAuthenticated(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-serif transition-colors cursor-pointer"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col gap-6">
        
        {/* 1. Summary Statistics Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Card: Total Tamu */}
          <div className="p-4 rounded-xl bg-black/40 border border-[#d8c39e]/25 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#d8c39e]">
              <span className="text-xs font-serif uppercase tracking-wider">Total Tamu</span>
              <Users className="w-4 h-4 opacity-75" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf6ed] mt-2">
              {totalGuests}
            </p>
            <span className="text-[10px] text-[#9c8973] font-serif mt-1">Link Terdaftar</span>
          </div>

          {/* Card: Total RSVP Masuk */}
          <div className="p-4 rounded-xl bg-black/40 border border-[#d8c39e]/25 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#d8c39e]">
              <span className="text-xs font-serif uppercase tracking-wider">Total RSVP</span>
              <CheckCircle2 className="w-4 h-4 opacity-75" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf6ed] mt-2">
              {totalRsvps}
            </p>
            <span className="text-[10px] text-[#9c8973] font-serif mt-1">Konfirmasi Masuk</span>
          </div>

          {/* Card: Tamu Hadir & Porsi Katering */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-serif uppercase tracking-wider">Tamu Hadir</span>
              <UtensilsCrossed className="w-4 h-4 opacity-75" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
                {totalPaxAttending}
              </p>
              <span className="text-xs text-emerald-400/80 font-serif">Porsi (Pax)</span>
            </div>
            <span className="text-[10px] text-emerald-400/70 font-serif mt-1">
              Dari {attendingRsvps.length} tanggapan hadir
            </span>
          </div>

          {/* Card: Tidak Hadir */}
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-400">
              <span className="text-xs font-serif uppercase tracking-wider">Tidak Hadir</span>
              <XCircle className="w-4 h-4 opacity-75" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-rose-300 mt-2">
              {notAttendingRsvps.length}
            </p>
            <span className="text-[10px] text-rose-400/70 font-serif mt-1">Halangan / Berhalangan</span>
          </div>

          {/* Card: Total Doa & Ucapan */}
          <div className="p-4 rounded-xl bg-black/40 border border-[#d8c39e]/25 shadow-md flex flex-col justify-between col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-[#d8c39e]">
              <span className="text-xs font-serif uppercase tracking-wider">Doa &amp; Ucapan</span>
              <MessageSquare className="w-4 h-4 opacity-75" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf6ed] mt-2">
              {totalWishes}
            </p>
            <span className="text-[10px] text-[#9c8973] font-serif mt-1">Buku Tamu Online</span>
          </div>
        </section>

        {/* 2. Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => {
              setActiveTab("guests");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-serif tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "guests"
                ? "bg-[#5c0e1a] text-[#fbf6ed] border border-[#d8c39e]/60 font-semibold shadow-md"
                : "text-[#a8957c] hover:text-[#ebdcc9] hover:bg-white/5"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Daftar Tamu ({guests.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("rsvps");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-serif tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "rsvps"
                ? "bg-[#5c0e1a] text-[#fbf6ed] border border-[#d8c39e]/60 font-semibold shadow-md"
                : "text-[#a8957c] hover:text-[#ebdcc9] hover:bg-white/5"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Rekap RSVP ({rsvps.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("wishes");
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-serif tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "wishes"
                ? "bg-[#5c0e1a] text-[#fbf6ed] border border-[#d8c39e]/60 font-semibold shadow-md"
                : "text-[#a8957c] hover:text-[#ebdcc9] hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Buku Ucapan ({wishes.length})</span>
          </button>
        </div>

        {/* 3. Search and Action Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c7a65]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === "guests"
                  ? "Cari nama tamu..."
                  : activeTab === "rsvps"
                  ? "Cari konfirmasi nama tamu..."
                  : "Cari isi ucapan atau pengirim..."
              }
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-[#d8c39e]/30 text-xs text-[#fbf6ed] placeholder-[#7d6954] focus:outline-none focus:border-[#d8c39e]"
            />
          </div>

          {/* Action Toolbar for Current Tab */}
          <div className="flex items-center gap-2">
            {activeTab === "rsvps" && (
              <>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setRsvpFilter("all")}
                    className={`px-2.5 py-1 rounded text-[11px] font-serif transition-colors ${
                      rsvpFilter === "all" ? "bg-[#5c0e1a] text-[#fbf6ed]" : "text-[#a8957c]"
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setRsvpFilter("yes")}
                    className={`px-2.5 py-1 rounded text-[11px] font-serif transition-colors ${
                      rsvpFilter === "yes" ? "bg-emerald-800 text-emerald-100" : "text-[#a8957c]"
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    onClick={() => setRsvpFilter("no")}
                    className={`px-2.5 py-1 rounded text-[11px] font-serif transition-colors ${
                      rsvpFilter === "no" ? "bg-rose-900 text-rose-100" : "text-[#a8957c]"
                    }`}
                  >
                    Tidak
                  </button>
                </div>

                <button
                  onClick={handleExportCsv}
                  className="px-3 py-2 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-200 text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Unduh Rekap CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 4. Tab 1: Manajemen Tamu (Guest Link Generator) */}
        {activeTab === "guests" && (
          <div className="space-y-4">
            {/* Form Tambah Tamu Baru */}
            <form
              onSubmit={handleAddGuest}
              className="p-4 rounded-xl bg-black/40 border border-[#d8c39e]/30 flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="flex-1 w-full">
                <input
                  type="text"
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="Ketik Nama Tamu (Contoh: Bapak Ahmad Fauzi &amp; Partner)"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-[#d8c39e]/30 text-xs text-[#fbf6ed] placeholder-[#7d6954] focus:outline-none focus:border-[#d8c39e]"
                />
              </div>

              <button
                type="submit"
                disabled={isAddingGuest}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7a1222] to-[#540b16] hover:from-[#8f1528] hover:to-[#630d1a] border border-[#d8c39e]/60 text-xs font-serif font-semibold tracking-wider uppercase text-[#fbf6ed] shadow transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-[#d8c39e]" />
                <span>{isAddingGuest ? "Menyimpan..." : "Tambah Tamu"}</span>
              </button>
            </form>

            {/* Tabel Daftar Tamu */}
            <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 text-[#d8c39e] uppercase tracking-wider font-serif border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3.5">No</th>
                      <th className="px-4 py-3.5">Nama Tamu</th>
                      <th className="px-4 py-3.5">Link Undangan Personal</th>
                      <th className="px-4 py-3.5 text-center">Aksi / Kirim</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredGuests.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center text-[#8c7a65] font-serif">
                          {searchQuery
                            ? "Tidak ada tamu yang cocok dengan pencarian."
                            : "Belum ada tamu terdaftar. Silakan tambahkan nama tamu di atas."}
                        </td>
                      </tr>
                    ) : (
                      filteredGuests.map((guest, idx) => (
                        <tr key={guest.id} className="hover:bg-white/[0.03] transition-colors">
                          <td className="px-4 py-3 text-[#8c7a65]">{idx + 1}</td>
                          <td className="px-4 py-3 font-serif font-medium text-[#fbf6ed]">
                            {guest.name}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[11px] font-mono text-[#a8957c] truncate max-w-xs block opacity-85">
                              {getGuestInvitationUrl(guest)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              {/* Copy Link Button */}
                              <button
                                onClick={() => handleCopyLink(guest)}
                                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#d8c39e]/20 border border-white/10 text-[#ebdcc9] text-[11px] font-serif flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                                title="Salin Tautan"
                              >
                                {copiedId === guest.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-300">Tersalin</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-[#d8c39e]" />
                                    <span>Salin</span>
                                  </>
                                )}
                              </button>

                              {/* WhatsApp Share Button */}
                              <button
                                onClick={() => handleShareWhatsApp(guest)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 text-emerald-200 text-[11px] font-serif flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                                title="Kirim ke WhatsApp"
                              >
                                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>WhatsApp</span>
                              </button>

                              {/* Delete Guest */}
                              <button
                                onClick={() => handleDeleteGuest(guest.id)}
                                className="p-1.5 rounded-lg hover:bg-rose-900/40 text-rose-400/80 hover:text-rose-300 transition-colors"
                                title="Hapus Tamu"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. Tab 2: Rekapitulasi RSVP */}
        {activeTab === "rsvps" && (
          <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 text-[#d8c39e] uppercase tracking-wider font-serif border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3.5">No</th>
                    <th className="px-4 py-3.5">Nama Tamu</th>
                    <th className="px-4 py-3.5">Kehadiran</th>
                    <th className="px-4 py-3.5">Jumlah Orang</th>
                    <th className="px-4 py-3.5">Alamat / Domisili</th>
                    <th className="px-4 py-3.5">Waktu Konfirmasi</th>
                    <th className="px-4 py-3.5 text-center">Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRsvps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-[#8c7a65] font-serif">
                        {searchQuery
                          ? "Tidak ada RSVP yang cocok dengan pencarian."
                          : "Belum ada konfirmasi RSVP yang masuk."}
                      </td>
                    </tr>
                  ) : (
                    filteredRsvps.map((rsvp, idx) => (
                      <tr key={rsvp.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-4 py-3 text-[#8c7a65]">{idx + 1}</td>
                        <td className="px-4 py-3 font-serif font-medium text-[#fbf6ed]">
                          {rsvp.name}
                        </td>
                        <td className="px-4 py-3">
                          {rsvp.attending === "Yes" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-serif font-medium">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Hadir</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[10px] font-serif font-medium">
                              <XCircle className="w-3 h-3 text-rose-400" />
                              <span>Tidak Hadir</span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-serif">
                          <span className="font-semibold text-[#fbf6ed]">
                            {rsvp.attending === "Yes" ? `${rsvp.guests} Orang` : "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#a8957c] font-serif">
                          {rsvp.address || "-"}
                        </td>
                        <td className="px-4 py-3 text-[#8c7a65] font-serif">
                          {new Date(rsvp.created_at).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteRsvp(rsvp.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-900/40 text-rose-400/80 hover:text-rose-300 transition-colors"
                            title="Hapus Data RSVP"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Tab 3: Moderasi Buku Ucapan & Doa */}
        {activeTab === "wishes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredWishes.length === 0 ? (
              <div className="col-span-full p-10 text-center text-[#8c7a65] font-serif border border-white/10 rounded-xl bg-black/30">
                {searchQuery
                  ? "Tidak ada ucapan yang cocok dengan pencarian."
                  : "Belum ada doa dan ucapan yang masuk."}
              </div>
            ) : (
              filteredWishes.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-xl bg-black/40 border border-[#d8c39e]/20 flex flex-col justify-between gap-3 text-left relative group hover:border-[#d8c39e]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-[#fbf6ed] text-sm">
                        {w.name}
                      </span>
                      <span className="text-[10px] text-[#8c7a65] font-serif">
                        {new Date(w.created_at).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <span className="text-[9px] uppercase tracking-wider font-serif text-[#d8c39e] block mt-0.5">
                      {w.relation}
                    </span>

                    <p className="text-xs font-serif text-[#dcd0bf] leading-relaxed mt-2.5 whitespace-pre-wrap">
                      {w.message}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                    <button
                      onClick={() => handleDeleteWish(w.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-serif text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus Ucapan</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
