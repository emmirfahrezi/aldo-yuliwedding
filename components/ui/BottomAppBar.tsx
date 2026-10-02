"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  BookOpen, 
  Users, 
  Clock, 
  MapPin, 
  Mail, 
  Gift, 
  MessageSquare 
} from "lucide-react";

interface BottomAppBarProps {
  isVisible: boolean;
}

export default function BottomAppBar({ isVisible }: BottomAppBarProps) {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Cover", icon: Home },
    { id: "quote", label: "Firman", icon: BookOpen },
    { id: "couple", label: "Mempelai", icon: Users },
    { id: "countdown", label: "Waktu", icon: Clock },
    { id: "event", label: "Lokasi", icon: MapPin },
    { id: "rsvp", label: "RSVP", icon: Mail },
    { id: "gift", label: "Gift", icon: Gift },
    { id: "wishes", label: "Doa", icon: MessageSquare },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[390px] animate-fadeIn pointer-events-none">
      <nav className="pointer-events-auto w-full px-2 py-2 rounded-full bg-black/80 border border-[#d8c39e]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-[#fbf6ed] bg-[#5c0e1a]/80 shadow-[0_0_12px_rgba(216,195,158,0.4)] scale-110"
                  : "text-[#a8957c] hover:text-[#ebdcc9] hover:scale-105"
              }`}
              title={item.label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
