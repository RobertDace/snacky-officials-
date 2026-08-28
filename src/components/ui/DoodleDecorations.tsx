import React from "react";

// 1. Crown Doodle (Sitting on top of photo/head)
export function CrownDoodle({ className = "w-12 h-10 text-stone-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 58 C22 55 78 55 92 58 L85 24 L60 42 L50 12 L40 42 L15 24 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="50" cy="10" r="3.5" fill="currentColor" />
      <circle cx="85" cy="22" r="3.5" fill="currentColor" />
      <circle cx="15" cy="22" r="3.5" fill="currentColor" />
      <path
        d="M20 54 C35 52 65 52 80 54"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Bunny Rabbit Doodle (Cute floppy-eared bunny in top right)
export function BunnyDoodle({ className = "w-14 h-16 text-stone-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left Ear */}
      <path
        d="M26 48 C18 35 12 18 20 8 C28 -2 36 12 34 32 C33 40 32 45 32 48"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M22 18 C22 12 28 8 30 18 C31 25 30 35 30 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Right Ear */}
      <path
        d="M44 48 C44 38 46 16 54 8 C62 -1 68 12 60 30 C56 40 54 45 52 48"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M52 18 C56 12 60 8 60 18 C60 25 56 35 54 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="40" cy="62" rx="24" ry="20" fill="white" stroke="currentColor" strokeWidth="3.5" />
      
      {/* Eyes & Nose */}
      <ellipse cx="32" cy="58" rx="2.5" ry="3.5" fill="currentColor" />
      <ellipse cx="48" cy="58" rx="2.5" ry="3.5" fill="currentColor" />
      <path d="M38 65 L42 65 L40 68 Z" fill="currentColor" />
      <path d="M40 68 C38 72 34 72 32 70 M40 68 C42 72 46 72 48 70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Whiskers */}
      <path d="M22 62 L10 60 M22 65 L8 66 M22 68 L10 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 62 L70 60 M58 65 L72 66 M58 68 L70 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 3. Daisy Flower Doodle
export function DaisyDoodle({ className = "w-10 h-10 text-stone-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 8 Petals */}
      <ellipse cx="30" cy="14" rx="6" ry="10" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="30" cy="46" rx="6" ry="10" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="14" cy="30" rx="10" ry="6" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="46" cy="30" rx="10" ry="6" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="19" cy="19" rx="6" ry="10" transform="rotate(-45 19 19)" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="41" cy="41" rx="6" ry="10" transform="rotate(-45 41 41)" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="41" cy="19" rx="6" ry="10" transform="rotate(45 41 19)" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="19" cy="41" rx="6" ry="10" transform="rotate(45 19 41)" fill="white" stroke="currentColor" strokeWidth="2.5" />
      {/* Center Yellow Core */}
      <circle cx="30" cy="30" r="8" fill="#FDE047" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

// 4. Bow Ribbon Doodle (with hanging ribbons & heart)
export function BowRibbonDoodle({ className = "w-14 h-14 text-stone-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left loop */}
      <path
        d="M38 28 C26 14 6 18 10 32 C12 40 28 36 38 32"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Right loop */}
      <path
        d="M42 28 C54 14 74 18 70 32 C68 40 52 36 42 32"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Center knot */}
      <ellipse cx="40" cy="30" rx="5" ry="4" fill="white" stroke="currentColor" strokeWidth="3.5" />
      {/* Ribbons */}
      <path
        d="M36 33 C32 46 22 56 16 68 M44 33 C48 46 58 56 64 68"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Cute little floating red heart */}
      <path
        d="M40 45 C38 41 33 42 33 46 C33 50 40 54 40 54 C40 54 47 50 47 46 C47 42 42 41 40 45 Z"
        fill="#F43F5E"
      />
    </svg>
  );
}

// 5. Gingham Fabric Patch with Doodle Hearts
export function GinghamPatch({ className = "w-20 h-28" }: { className?: string }) {
  return (
    <div className={`relative p-2 bg-gingham rounded-lg border-2 border-dashed border-red-300 shadow-md rotate-[-4deg] overflow-hidden ${className}`}>
      <div className="flex flex-col items-center justify-center h-full space-y-1.5 py-1">
        <svg viewBox="0 0 32 30" fill="none" className="w-5 h-5 text-stone-900">
          <path
            d="M16 8 C13 0 2 2 2 12 C2 19 16 26 16 26 C16 26 30 19 30 12 C30 2 19 0 16 8 Z"
            fill="#1E1B18"
          />
        </svg>
        <svg viewBox="0 0 32 30" fill="none" className="w-4 h-4 text-stone-900">
          <path
            d="M16 8 C13 0 2 2 2 12 C2 19 16 26 16 26 C16 26 30 19 30 12 C30 2 19 0 16 8 Z"
            fill="#1E1B18"
          />
        </svg>
        <svg viewBox="0 0 32 30" fill="none" className="w-5 h-5 text-stone-900">
          <path
            d="M16 8 C13 0 2 2 2 12 C2 19 16 26 16 26 C16 26 30 19 30 12 C30 2 19 0 16 8 Z"
            fill="#1E1B18"
          />
        </svg>
      </div>
    </div>
  );
}

// 6. Vinyl Record Sticker with Washi Tape
export function VinylSticker({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className} select-none`}>
      {/* Tape on Top */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-amber-100/90 border-l border-r border-amber-300 rotate-[-8deg] z-10 shadow-xs" />
      {/* Vinyl Disc */}
      <div className="w-full h-full rounded-full bg-stone-900 border-2 border-stone-800 shadow-md flex items-center justify-center p-1.5 relative overflow-hidden group">
        <div className="w-full h-full rounded-full border border-stone-700/60 flex items-center justify-center">
          <div className="w-3/5 h-3/5 rounded-full border border-stone-700/60 flex items-center justify-center">
            {/* Center label */}
            <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-amber-200 to-pink-200 border border-stone-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Kraft Paper Corner with Painted Red Heart
export function KraftHeartCorner({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative bg-[#DDC8AA] rounded-tl-2xl p-3 shadow-md rotate-[6deg] border border-[#C5B090] ${className}`}>
      <div className="flex items-center justify-center h-full">
        {/* Painted Crayon Heart */}
        <svg viewBox="0 0 40 36" fill="none" className="w-8 h-8 drop-shadow-xs">
          <path
            d="M20 10 C16 1 4 4 4 15 C4 23 20 32 20 32 C20 32 36 23 36 15 C36 4 24 1 20 10 Z"
            fill="#E11D48"
            stroke="#9F1239"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

// 8. Newspaper / Love clipping texture
export function NewspaperLovePatch({ className = "w-16 h-20" }: { className?: string }) {
  return (
    <div className={`bg-[#E8E2D5] border border-[#D5CEBF] p-1.5 font-mono text-[6px] leading-[8px] text-stone-700 tracking-tighter overflow-hidden select-none shadow-xs rotate-[8deg] ${className}`}>
      love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love love
    </div>
  );
}

