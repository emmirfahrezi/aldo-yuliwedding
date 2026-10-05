"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Disc3 } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Offset waktu awal lagu (dipotong 7 detik awal agar langsung masuk ke musik)
  const START_OFFSET_SECONDS = 6;

  // Initialize audio instance with Goodness of God
  useEffect(() => {
    // Both filenames are supported: clean alias and original public path
    const audio = new Audio("/goodness_of_god.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.onerror = () => {
      audio.src = "/Goodness%20Of%20God%20(Lyrics)%20~%20Bethel%20Music.mp3";
    };

    // Skip the first 7 seconds as soon as metadata is loaded
    const handleLoadedMetadata = () => {
      try {
        if (audio.currentTime < START_OFFSET_SECONDS) {
          audio.currentTime = START_OFFSET_SECONDS;
        }
      } catch (err) {
        console.warn("Audio pre-seek error:", err);
      }
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When autoPlayTrigger turns true (e.g. user opens envelope)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      const audio = audioRef.current;

      try {
        if (audio.currentTime < START_OFFSET_SECONDS) {
          audio.currentTime = START_OFFSET_SECONDS;
        }
      } catch {
        // Fallback if not seekable yet
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          // Ensure it's at 7 seconds after play starts
          if (audio.currentTime < START_OFFSET_SECONDS) {
            audio.currentTime = START_OFFSET_SECONDS;
          }
        })
        .catch((err) => {
          console.warn("Autoplay audio blocked or pending user interaction:", err);
        });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.currentTime < START_OFFSET_SECONDS) {
        try {
          audioRef.current.currentTime = START_OFFSET_SECONDS;
        } catch {
          // fallback
        }
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio play error:", err));
    }
  };

  return (
    <div className="fixed top-4 right-4 sm:right-auto sm:left-1/2 sm:translate-x-[155px] z-40 select-none animate-fadeIn pointer-events-auto">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
        className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.85)] border border-[#d8c39e]/50 backdrop-blur-md active:scale-95 ${
          isPlaying
            ? "bg-[#380811]/90 text-[#fbf6ed] shadow-[0_0_18px_rgba(216,195,158,0.35)]"
            : "bg-black/80 text-[#c5a880]/70 hover:text-[#fbf6ed]"
        }`}
        title={isPlaying ? "Jeda Musik (Goodness of God)" : "Putar Musik (Goodness of God)"}
      >
        {/* Vinyl Disc with Smooth Continuous Rotation when playing */}
        <div
          className={`flex items-center justify-center transition-transform ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "5s" }}
        >
          <Disc3 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#d8c39e]" />
        </div>

        {/* Small Audio Status Badge */}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1b0307] border border-[#d8c39e]/70 flex items-center justify-center text-[#d8c39e]">
          {isPlaying ? (
            <Volume2 className="w-2.5 h-2.5 text-[#d8c39e]" />
          ) : (
            <VolumeX className="w-2.5 h-2.5 text-red-400" />
          )}
        </div>
      </button>
    </div>
  );
}
