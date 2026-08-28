import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SNACKY_INFO } from "@/lib/constants";
import { RansomTitle } from "@/components/ui/RansomTitle";
import { 
  BunnyDoodle, 
  DaisyDoodle, 
  BowRibbonDoodle 
} from "@/components/ui/DoodleDecorations";
import { WashiTape } from "@/components/ui/WashiTape";
import { PostCard } from "@/components/releases/PostCard";
import { 
  SpotifyIcon, 
  YouTubeIcon, 
  InstagramIcon, 
  TikTokIcon 
} from "@/components/ui/SocialIcons";
import { 
  Music, 
  ArrowRight, 
  ExternalLink, 
  MessageSquare,
  Radio,
  Heart,
  Sparkles
} from "lucide-react";

import { FALLBACK_POSTS } from "@/lib/fallbackData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let latestPosts: any[] = [];
  try {
    latestPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" }
      ],
      take: 4,
      include: {
        _count: {
          select: { comments: true }
        }
      }
    });
  } catch (error) {
    console.error("Prisma error in HomePage, using fallback data:", error);
  }

  if (!latestPosts || latestPosts.length === 0) {
    latestPosts = FALLBACK_POSTS;
  }

  const featuredSingle = latestPosts.find((p: any) => p.category === "SINGLE") || latestPosts[0];
  const otherPosts = latestPosts.filter((p: any) => p.id !== featuredSingle?.id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-20">
      
      {/* 1. HERO COLLAGE SECTION */}
      <section className="relative">
        <div className="scrapbook-card p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-white/95">
          {/* Top Washi Tapes */}
          <WashiTape color="yellow" position="top-left" />
          <WashiTape color="pink" position="top-right" />

          {/* Background Floating Decorative Doodles */}
          <div className="absolute top-4 right-8 pointer-events-none opacity-90 hidden sm:block">
            <DaisyDoodle className="w-12 h-12 text-stone-800" />
          </div>
          <div className="absolute bottom-6 left-8 pointer-events-none opacity-90 hidden sm:block">
            <DaisyDoodle className="w-10 h-10 text-stone-800 rotate-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left: Text & Bio Brief */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 font-coomfie">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-950 text-xs font-bold rounded-full border border-amber-300 shadow-2xs">
                  <Radio className="w-3.5 h-3.5 text-amber-800" />
                  <span>Berlin, Germany</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-950 text-xs font-bold rounded-full border border-pink-300 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-pink-600" />
                  <span>Originals & Acoustic Covers</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-950 text-xs font-bold rounded-full border border-emerald-300 shadow-2xs">
                  <Music className="w-3 h-3 text-emerald-700" />
                  <span>English Lyrics</span>
                </span>
              </div>

              {/* Central Ransom Cutout Headline - Strictly 1 Line */}
              <div className="pt-2 pb-1 flex justify-center lg:justify-start w-full">
                <RansomTitle
                  size="hero"
                  showSubtitle={true}
                  subtitleText="Jazz & Bossa Nova Singer-Songwriter"
                  className="items-center lg:items-start"
                />
              </div>

              {/* Bio Subtitle */}
              <p className="font-coomfie text-base sm:text-lg text-stone-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Crafting intimate acoustic songs with breezy nylon-string rhythms, warm swing harmonies, and honest storytelling.
              </p>

              {/* Handwritten Quote Box */}
              <div className="relative p-4 bg-[#FFFDF9] border-2 border-dashed border-[#E5DCCB] rounded-2xl max-w-lg mx-auto lg:mx-0 shadow-xs">
                <p className="font-lillove text-2xl sm:text-3xl text-[#9A6028] font-bold leading-snug">
                  &ldquo;Writing songs on sunny afternoons, quiet train rides, and honest feelings. Welcome to my music scrapbook!&rdquo;
                </p>
              </div>

              {/* Call-to-action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 font-coomfie">
                <a
                  href={SNACKY_INFO.socials.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1AA34A] text-white font-bold text-sm rounded-full shadow-md hover:scale-105 transition-all"
                >
                  <SpotifyIcon className="w-4.5 h-4.5" />
                  <span>Listen on Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <Link
                  href="/releases"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#9E5D32] hover:bg-[#854B24] text-white font-bold text-sm rounded-full shadow-sm hover:scale-105 transition-all"
                >
                  <span>Browse Releases</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/bio"
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm rounded-full border border-stone-300 shadow-2xs hover:scale-105 transition-all"
                >
                  <span>Read Full Bio</span>
                </Link>
              </div>

            </div>

            {/* Right: Master Collage Portrait with Real Artwork */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* 1. Main Artwork Frame (Clean polaroid frame, NO stickers obscuring photo text) */}
                <div className="relative bg-white p-3.5 pb-6 rounded-2xl shadow-xl border border-[#E7DFCE] rotate-1 hover:rotate-0 transition-transform duration-300">
                  <WashiTape color="yellow" position="top-center" />

                  {/* Cute Bunny floating outside top-right */}
                  <div className="absolute -top-7 -right-7 z-20 pointer-events-none drop-shadow-sm">
                    <BunnyDoodle className="w-16 h-18 text-stone-900 rotate-6" />
                  </div>

                  {/* Bow Ribbon floating outside top-left */}
                  <div className="absolute -top-6 -left-6 z-20 pointer-events-none drop-shadow-sm">
                    <BowRibbonDoodle className="w-14 h-14 text-stone-900 -rotate-12" />
                  </div>

                  {/* The Real Artwork Photo Image - 100% UNCOVERED */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200">
                    <img
                      src="/snacky-cover.jpg"
                      alt="Snacky playing guitar in the meadow"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Polaroid Bottom Signature */}
                  <div className="mt-3.5 flex items-center justify-between px-2">
                    <p className="font-lillove text-3xl text-stone-800 font-bold">
                      Acoustic Meadow Sessions
                    </p>
                    <span className="font-lillove text-xl text-stone-500 font-bold">
                      Berlin
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE SOCIAL & STREAMING SCRAPBOOK HUB */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b-2 border-[#E7DFCE] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <h2 className="text-2xl sm:text-3xl font-coomfie font-bold text-stone-900">
              Official Channels & Music
            </h2>
          </div>
          <span className="font-lillove text-2xl text-[#9A6028] font-bold">
            Tap any card to connect ↗
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Spotify */}
          <a
            href={SNACKY_INFO.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-2 border-emerald-300/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <WashiTape color="sage" position="top-right" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1DB954] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <SpotifyIcon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-700 opacity-60 group-hover:opacity-100" />
            </div>
            <span className="text-[11px] font-coomfie font-bold text-emerald-800 uppercase tracking-wider">Music Streaming</span>
            <h3 className="text-lg font-coomfie font-bold text-stone-900 mt-0.5 mb-1 group-hover:text-emerald-800 transition-colors">
              Spotify Profile
            </h3>
            <p className="font-coomfie text-xs text-stone-600 leading-relaxed mb-4">
              Stream all original jazz & bossa nova singles, acoustic tracks, and playlists.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-coomfie font-bold text-emerald-950 bg-emerald-200/90 px-3 py-1.5 rounded-full">
              <span>Open on Spotify</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

          {/* YouTube */}
          <a
            href={SNACKY_INFO.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-rose-50 to-rose-100/70 border-2 border-rose-300/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <WashiTape color="pink" position="top-left" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <YouTubeIcon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-rose-700 opacity-60 group-hover:opacity-100" />
            </div>
            <span className="text-[11px] font-coomfie font-bold text-rose-800 uppercase tracking-wider">Video Sessions</span>
            <h3 className="text-lg font-coomfie font-bold text-stone-900 mt-0.5 mb-1 group-hover:text-rose-800 transition-colors">
              YouTube Channel
            </h3>
            <p className="font-coomfie text-xs text-stone-600 leading-relaxed mb-4">
              Official music videos, studio session live recordings, and acoustic cover renditions.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-coomfie font-bold text-rose-950 bg-rose-200/90 px-3 py-1.5 rounded-full">
              <span>Watch on YouTube</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={SNACKY_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-pink-50 to-amber-100/70 border-2 border-pink-300/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <WashiTape color="yellow" position="top-right" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-pink-700 opacity-60 group-hover:opacity-100" />
            </div>
            <span className="text-[11px] font-coomfie font-bold text-pink-800 uppercase tracking-wider">Daily Updates</span>
            <h3 className="text-lg font-coomfie font-bold text-stone-900 mt-0.5 mb-1 group-hover:text-pink-800 transition-colors">
              Instagram @snacky_officially
            </h3>
            <p className="font-coomfie text-xs text-stone-600 leading-relaxed mb-4">
              Behind-the-scenes photos, song previews, tour announcements, and direct messages.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-coomfie font-bold text-pink-950 bg-pink-200/90 px-3 py-1.5 rounded-full">
              <span>Follow on Instagram</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

          {/* TikTok */}
          <a
            href={SNACKY_INFO.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-sky-50 to-stone-100 border-2 border-sky-300/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <WashiTape color="blue" position="top-left" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-950 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <TikTokIcon className="w-5.5 h-5.5" />
              </div>
              <ExternalLink className="w-4 h-4 text-stone-700 opacity-60 group-hover:opacity-100" />
            </div>
            <span className="text-[11px] font-coomfie font-bold text-stone-700 uppercase tracking-wider">Acoustic Reels</span>
            <h3 className="text-lg font-coomfie font-bold text-stone-900 mt-0.5 mb-1 group-hover:text-stone-700 transition-colors">
              TikTok @snacky206
            </h3>
            <p className="font-coomfie text-xs text-stone-600 leading-relaxed mb-4">
              Raw guitar acoustic shorts, singing clips, harmony duets, and casual rehearsals.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-coomfie font-bold text-stone-950 bg-sky-200/90 px-3 py-1.5 rounded-full">
              <span>Follow on TikTok</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>

        </div>
      </section>

      {/* 3. FEATURED SPOTLIGHT RELEASE */}
      {featuredSingle && (
        <section className="relative scrapbook-card p-6 sm:p-10 bg-[#FFFDF9] border-[#E7DFCE]">
          <WashiTape color="yellow" position="top-center" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-xs">
                <div className="relative bg-white p-3 pb-6 rounded-xl border border-stone-200 shadow-md rotate-[-2deg] hover:rotate-0 transition-transform">
                  <WashiTape color="sage" position="top-center" />
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={featuredSingle.coverImage || "/snacky-cover.jpg"}
                      alt={featuredSingle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-lillove text-2xl text-stone-900 font-bold text-center mt-2.5">
                    {featuredSingle.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 font-coomfie">
                <span className="px-3 py-1 bg-amber-100 text-amber-950 text-xs font-bold rounded-full border border-amber-300">
                  Featured Single
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-950 text-xs font-bold rounded-full border border-pink-300">
                  {featuredSingle.category}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-coomfie font-bold text-stone-900 leading-tight">
                {featuredSingle.title}
              </h3>

              <p className="font-coomfie text-stone-600 text-sm sm:text-base leading-relaxed max-w-lg">
                {featuredSingle.summary || featuredSingle.content.slice(0, 140) + "..."}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 font-coomfie">
                <Link
                  href={`/releases/${featuredSingle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E5D32] hover:bg-[#854B24] text-white font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Story & Comments ({featuredSingle._count?.comments || 0})</span>
                </Link>

                <a
                  href={featuredSingle.spotifyUrl || SNACKY_INFO.socials.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs rounded-full border border-emerald-300 transition-colors"
                >
                  <SpotifyIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Stream on Spotify</span>
                </a>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. OTHER RECENT RELEASES */}
      {otherPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#E7DFCE] pb-3">
            <h2 className="text-2xl font-coomfie font-bold text-stone-900">
              Recent Releases & Journal
            </h2>
            <Link
              href="/releases"
              className="font-coomfie text-xs font-bold text-[#9E5D32] hover:text-[#854B24] transition-colors inline-flex items-center gap-1"
            >
              <span>View all entries</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 5. FAN COMMUNITY INVITATION */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-pink-100/90 via-amber-100/80 to-sky-100/90 border-2 border-[#E7DFCE] text-center space-y-4">
        <WashiTape color="pink" position="top-center" />
        <div className="inline-flex p-3 bg-white/90 rounded-full shadow-xs mb-1">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-coomfie font-bold text-stone-900">
          Join the Snacky Listener Community
        </h2>
        <p className="font-coomfie text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Create your free fan account to leave comments on new songs, ask questions about chords and lyrics, and receive announcements for live shows!
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3 font-coomfie">
          <Link
            href="/register"
            className="px-6 py-3 bg-[#9E5D32] hover:bg-[#854B24] text-white font-bold rounded-full shadow-md hover:scale-105 transition-all text-xs"
          >
            Create Free Fan Account
          </Link>
          <Link
            href="/releases"
            className="px-6 py-3 bg-white/90 hover:bg-white text-stone-800 font-bold rounded-full border border-stone-300 shadow-xs hover:scale-105 transition-all text-xs"
          >
            Browse News & Releases
          </Link>
        </div>
      </section>

    </div>
  );
}