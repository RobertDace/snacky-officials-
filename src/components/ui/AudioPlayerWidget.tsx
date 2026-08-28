"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Disc3, ExternalLink } from "lucide-react";
import { SpotifyIcon } from "@/components/ui/SocialIcons";
import { SNACKY_INFO } from "@/lib/constants";

export function AudioPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const tracks = [
    {
      title: "Golden Meadow (Acoustic Jazz)",
      genre: "Jazz / Bossa Nova",
      duration: "3:18",
      spotifyUrl: SNACKY_INFO.socials.spotify,
    },
    {
      title: "Bossa Nova by the River",
      genre: "Bossa Nova Acoustic",
      duration: "2:54",
      spotifyUrl: SNACKY_INFO.socials.spotify,
    },
    {
      title: "Berlin Autumn Breeze",
      genre: "Indie Pop Melody",
      duration: "3:40",
      spotifyUrl: SNACKY_INFO.socials.spotify,
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentTrackIndex((prevIdx) => (prevIdx + 1) % tracks.length);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, tracks.length]);

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-amber-50/95 border-2 border-amber-200 text-stone-800 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 backdrop-blur-md"
        >
          <Disc3 className={`w-5 h-5 text-amber-600 ${isPlaying ? "animate-spin" : ""}`} />
          <span className="font-handwriting text-lg font-bold text-stone-800">Snacky Music Preview</span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-1 bg-amber-500 animate-pulse h-3 rounded-full" />
              <span className="w-1 bg-amber-500 animate-pulse h-1.5 rounded-full" />
              <span className="w-1 bg-amber-500 animate-pulse h-2.5 rounded-full" />
            </span>
          )}
        </button>
      ) : (
        <div className="relative bg-amber-50/95 border-2 border-amber-200/90 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-all duration-300">
          <div className="washi-tape washi-yellow -top-3 right-8 w-16 -rotate-3" />

          <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-amber-200/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-200/70 rounded-full text-amber-800">
                <Music className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wider text-amber-900/70 uppercase">Sample Jukebox</p>
                <p className="text-xs font-bold text-stone-800 truncate max-w-[170px]">{currentTrack.title}</p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-stone-400 hover:text-stone-600 text-xs font-semibold px-2 py-0.5 rounded bg-amber-100/50 hover:bg-amber-200/60"
            >
              Minimize
            </button>
          </div>

          <div className="w-full bg-amber-200/50 h-1.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-full shadow-sm hover:scale-105 transition-transform"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-amber-100/60 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[11px] text-stone-500 font-medium">{currentTrack.genre}</span>
            </div>

            <a
              href={currentTrack.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200/90 px-2.5 py-1 rounded-full border border-emerald-300 transition-colors"
            >
              <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

