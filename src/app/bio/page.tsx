import React from "react";
import Link from "next/link";
import { SNACKY_INFO } from "@/lib/constants";
import { WashiTape } from "@/components/ui/WashiTape";
import { 
  DaisyDoodle, 
  BunnyDoodle, 
  BowRibbonDoodle 
} from "@/components/ui/DoodleDecorations";
import { 
  SpotifyIcon, 
  YouTubeIcon, 
  InstagramIcon, 
  TikTokIcon 
} from "@/components/ui/SocialIcons";
import { 
  Sparkles, 
  Music, 
  Heart, 
  MapPin, 
  Compass, 
  Disc, 
  ArrowRight,
  Coffee,
  Quote
} from "lucide-react";

export const metadata = {
  title: "Artist Bio | Snacky Official",
  description: "Learn more about Snacky, a jazz, bossa nova, and indie-pop singer-songwriter based in Berlin, Germany.",
};

export default function BioPage() {
  const influences = [
    {
      title: "Jazz & Harmony",
      desc: "Rich minor 9th chords, warm substitutions, and timeless swing textures that create an intimate, contemplative soundscape.",
      tag: "Harmonic Roots",
    },
    {
      title: "Bossa Nova Vibes",
      desc: "Gentle nylon-string syncopation, breezy tempo, and heartfelt vocal delivery inspired by Astrud Gilberto and Stan Getz.",
      tag: "Rhythmic Heart",
    },
    {
      title: "Indie Pop & Storytelling",
      desc: "Relatable English lyrics, sweet melodic hooks, and authentic acoustic guitar textures recorded in sunny afternoon sessions.",
      tag: "Vocal Identity",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      
      {/* 1. HERO POLAROID & QUICK STORY */}
      <section className="relative scrapbook-card p-6 sm:p-10 bg-[#FFFDF9] border-[#E7DFCE] overflow-visible">
        <WashiTape color="yellow" position="top-center" />

        <div className="space-y-6">
          <div className="border-b border-[#E7DFCE] pb-4 text-center sm:text-left">
            <span className="font-coomfie text-xs font-bold text-[#9A6028] uppercase tracking-widest block mb-1">
              Singer-Songwriter Profile
            </span>
            <h1 className="text-3xl sm:text-5xl font-coomfie font-bold text-stone-900 tracking-tight">
              Meet Snacky
            </h1>
            <p className="font-lillove text-2xl sm:text-3xl text-stone-600 font-bold mt-1">
              Acoustic melodies, jazz harmonies, and intimate bossa nova vibes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Main Meadow Collage Frame with Real Artwork (100% UNCOVERED PHOTO) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                
                <div className="relative bg-white p-3 pb-6 rounded-2xl shadow-xl border border-[#E7DFCE] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
                  <WashiTape color="sage" position="top-center" />

                  {/* Bunny Doodle floating outside top-right */}
                  <div className="absolute -top-7 -right-7 z-20 pointer-events-none drop-shadow-xs">
                    <BunnyDoodle className="w-14 h-16 text-stone-900 rotate-6" />
                  </div>

                  {/* Daisy Doodle floating outside top-left */}
                  <div className="absolute -top-6 -left-6 z-20 pointer-events-none drop-shadow-xs">
                    <DaisyDoodle className="w-12 h-12 text-stone-900" />
                  </div>

                  {/* Real Photo - 100% UNCOVERED */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src="/snacky-cover.jpg"
                      alt="Snacky in the meadow with acoustic guitar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-3 text-center">
                    <p className="font-lillove text-2xl text-stone-800 font-bold">
                      Meadow Sessions • Guitar & Song
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Quick Highlights & Story */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-2 font-coomfie">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-950 text-xs font-bold rounded-full border border-amber-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-800" />
                  <span>Berlin, Germany</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-950 text-xs font-bold rounded-full border border-sky-300">
                  <Compass className="w-3.5 h-3.5 text-sky-800" />
                  <span>English Lyrics & Vocals</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-950 text-xs font-bold rounded-full border border-pink-300">
                  <Disc className="w-3.5 h-3.5 text-pink-800" />
                  <span>Originals & Covers</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-coomfie font-bold text-stone-900 leading-snug">
                Combining Jazz Chords, Bossa Nova Rhythms, and Indie Pop Songwriting.
              </h2>

              <p className="font-coomfie text-stone-600 text-sm sm:text-base leading-relaxed">
                Snacky is a young singer-songwriter based in Germany, performing in English. She writes and sings her own original tracks while also performing acoustic covers across beloved eras.
              </p>

              <div className="p-4 bg-pink-50/90 border-2 border-dashed border-pink-200 rounded-2xl flex items-start gap-3">
                <Coffee className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <p className="font-coomfie text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  &ldquo;I believe songs should feel like a cozy breeze through the grass or sharing quiet thoughts with friends.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FULL NARRATIVE BIOGRAPHY */}
      <section className="relative scrapbook-card p-6 sm:p-10 bg-[#FFFDF9] border-[#E7DFCE] space-y-6">
        <WashiTape color="yellow" position="top-center" />
        
        <div className="flex items-center gap-3 pb-3 border-b border-[#E7DFCE]">
          <Quote className="w-6 h-6 text-[#9E5D32]" />
          <h2 className="text-2xl sm:text-3xl font-coomfie font-bold text-stone-900">
            About Snacky
          </h2>
        </div>

        <div className="space-y-4 font-coomfie text-stone-700 text-sm sm:text-base leading-relaxed">
          <p>
            A young artist based in Germany, singing and performing in English. She writes and performs her own original music, as well as acoustic covers across beloved eras and genres.
          </p>
          <p>
            Her original songs are mainly inspired by jazz and bossa nova, with elements of pop, indie pop, and similar genres. She combines these influences to create her own unique sound and style — intimate, melodic, and deeply comforting.
          </p>
          <p>
            You can find her music, live acoustic performances, and covers across her official social media platforms. All updates, new releases, tour dates, and upcoming projects are shared across Spotify, YouTube, Instagram, TikTok, and right here in this community journal.
          </p>
        </div>

        {/* Heartfelt Fan Appreciation Note */}
        <div className="mt-8 p-6 bg-white/90 border-2 border-dashed border-amber-300 rounded-2xl text-center space-y-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mx-auto" />
          <h3 className="font-coomfie text-xl font-bold text-stone-900">
            To Everyone Who Listens
          </h3>
          <p className="font-coomfie text-stone-600 text-xs sm:text-sm max-w-xl mx-auto italic leading-relaxed">
            &ldquo;Thank you so much for visiting my website and for listening to my original songs and covers. I truly appreciate your support and every kind word you leave in the comments!&rdquo;
          </p>
          <p className="font-lillove text-3xl text-[#9A6028] font-bold pt-1">
            ~ Snacky
          </p>
        </div>
      </section>

      {/* 3. MUSICAL INFLUENCES BREAKDOWN */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-coomfie font-bold text-stone-900">
            Musical Palette & Influences
          </h2>
          <p className="font-coomfie text-xs text-stone-500">
            The core inspirations behind Snacky&apos;s acoustic and jazz style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-coomfie">
          {influences.map((inf, idx) => (
            <div
              key={inf.title}
              className="relative p-6 bg-white border-2 border-[#E7DFCE] rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <WashiTape
                color={idx === 0 ? "yellow" : idx === 1 ? "sage" : "pink"}
                position="top-left"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {inf.tag}
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-3 mb-2">
                {inf.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {inf.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION: LISTEN & CONNECT */}
      <section className="p-8 bg-gradient-to-r from-amber-100 via-sky-100 to-pink-100 rounded-3xl border-2 border-[#E7DFCE] text-center space-y-4 font-coomfie">
        <WashiTape color="pink" position="top-center" />
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
          Ready to Hear the Music?
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
          Explore all singles, concert announcements, and join discussion with fellow fans.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/releases"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#9E5D32] hover:bg-[#854B24] text-white font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-transform"
          >
            <Music className="w-4 h-4" />
            <span>Explore Releases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={SNACKY_INFO.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#1DB954] hover:bg-[#1AA34A] text-white font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-transform"
          >
            <SpotifyIcon className="w-4 h-4" />
            <span>Spotify</span>
          </a>
          <a
            href={SNACKY_INFO.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-transform"
          >
            <YouTubeIcon className="w-4 h-4" />
            <span>YouTube</span>
          </a>
          <a
            href={SNACKY_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-transform"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href={SNACKY_INFO.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-transform"
          >
            <TikTokIcon className="w-4 h-4" />
            <span>TikTok</span>
          </a>
        </div>
      </section>

    </div>
  );
}