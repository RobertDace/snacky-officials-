import React from "react";
import Link from "next/link";
import { SNACKY_INFO } from "@/lib/constants";
import { Heart, Music } from "lucide-react";
import { DaisyDoodle } from "@/components/ui/DoodleDecorations";
import { 
  SpotifyIcon, 
  YouTubeIcon, 
  InstagramIcon, 
  TikTokIcon 
} from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-[#E7DFCE] bg-[#FAF7EE] pb-24 pt-14 overflow-hidden">
      {/* Decorative Washi Tape */}
      <div className="washi-strip washi-sage -top-3.5 left-1/4 w-32 rotate-2" />
      <div className="washi-strip washi-pink -top-3.5 right-1/4 w-32 -rotate-2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-[#E7DFCE] text-center md:text-left">
          
          {/* Brand & Artist Note */}
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="font-coomfie text-2xl font-bold text-stone-900">
                {SNACKY_INFO.name}
              </span>
              <span className="font-lillove text-xl text-[#9A6028] font-bold">
                • Scrapbook Portal
              </span>
            </div>
            <p className="font-coomfie text-xs text-stone-600 leading-relaxed max-w-sm">
              Based in Berlin, Germany. Performing original music and covers in English with jazz and bossa nova influences.
            </p>
          </div>

          {/* Social Channels Badge Grid with Official SVGs */}
          <div className="flex flex-wrap justify-center gap-2 font-coomfie">
            <a
              href={SNACKY_INFO.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold transition-transform hover:scale-105"
            >
              <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Spotify</span>
            </a>
            <a
              href={SNACKY_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 rounded-full text-xs font-bold transition-transform hover:scale-105"
            >
              <YouTubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>YouTube</span>
            </a>
            <a
              href={SNACKY_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-300 rounded-full text-xs font-bold transition-transform hover:scale-105"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
              <span>Instagram</span>
            </a>
            <a
              href={SNACKY_INFO.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-full text-xs font-bold transition-transform hover:scale-105"
            >
              <TikTokIcon className="w-3.5 h-3.5 text-stone-900" />
              <span>TikTok</span>
            </a>
          </div>

          {/* Quick Page Links */}
          <div className="flex justify-center md:justify-end gap-5 text-xs font-coomfie font-bold text-stone-700">
            <Link href="/" className="hover:text-[#9E5D32] hover:underline">
              Home
            </Link>
            <Link href="/bio" className="hover:text-[#9E5D32] hover:underline">
              Bio
            </Link>
            <Link href="/releases" className="hover:text-[#9E5D32] hover:underline">
              Releases
            </Link>
            <Link href="/login" className="hover:text-[#9E5D32] hover:underline">
              Portal
            </Link>
          </div>

        </div>

        {/* Heartfelt Sign-off */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p className="font-coomfie">© {new Date().getFullYear()} Snacky. All rights reserved · Kira Lynnyk</p>
          <p className="flex items-center gap-1.5 font-lillove text-xl text-stone-700 font-bold">
            <span>With love & music</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>for listeners everywhere</span>
          </p>
        </div>

      </div>
    </footer>
  );
}