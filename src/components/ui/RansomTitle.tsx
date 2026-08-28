import React from "react";

interface RansomTitleProps {
  size?: "nav" | "sm" | "md" | "lg" | "hero";
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export function RansomTitle({
  size = "hero",
  showSubtitle = true,
  subtitleText = "Jazz & Bossa Nova Singer-Songwriter",
  className = "",
}: RansomTitleProps) {
  const sizeConfig = {
    nav: {
      letter: "w-5.5 sm:w-6.5 h-6.5 sm:h-7.5 text-[10px] sm:text-xs font-black",
      exclamation: "w-4 sm:w-5 h-6.5 sm:h-7.5 text-[9px] sm:text-[10px] font-black",
      gap: "gap-0.5 sm:gap-0.5",
      subtitle: "text-xs",
    },
    sm: {
      letter: "w-7 h-9 text-base",
      exclamation: "w-6 h-9 text-sm",
      gap: "gap-1",
      subtitle: "text-base",
    },
    md: {
      letter: "w-9 sm:w-11 h-12 sm:h-14 text-2xl sm:text-3xl",
      exclamation: "w-7 sm:w-9 h-12 sm:h-14 text-xl sm:text-2xl",
      gap: "gap-1 sm:gap-1.5",
      subtitle: "text-xl sm:text-2xl",
    },
    lg: {
      letter: "w-10 sm:w-13 md:w-14 h-14 sm:h-17 md:h-18 text-3xl sm:text-4xl md:text-5xl",
      exclamation: "w-8 sm:w-10 md:w-11 h-14 sm:h-17 md:h-18 text-2xl sm:text-3xl md:text-4xl",
      gap: "gap-1 sm:gap-1.5 md:gap-2",
      subtitle: "text-2xl sm:text-3xl",
    },
    hero: {
      letter: "w-8 min-[390px]:w-9.5 sm:w-13 md:w-14 lg:w-15 xl:w-17 h-12 min-[390px]:h-14 sm:h-18 md:h-19 lg:h-20 xl:h-22 text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl",
      exclamation: "w-6.5 min-[390px]:w-8 sm:w-10 md:w-10.5 lg:w-11 xl:w-13 h-12 min-[390px]:h-14 sm:h-18 md:h-19 lg:h-20 xl:h-22 text-xl min-[390px]:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl",
      gap: "gap-1 min-[390px]:gap-1.5 sm:gap-2 md:gap-2.5",
      subtitle: "text-2xl sm:text-3xl md:text-4xl",
    },
  }[size];

  return (
    <div className={`flex flex-col select-none w-full max-w-full ${className || "items-center"}`}>
      {/* 1. The Ransom Letter Cutouts Row - Guaranteed 1 Line */}
      <div className={`flex items-center flex-nowrap whitespace-nowrap overflow-visible ${sizeConfig.gap}`}>
        
        {/* Letter S - Brown Kraft Paper */}
        <div
          className={`ransom-tile ${sizeConfig.letter} -rotate-6 bg-[#9E5D32] text-white font-sans font-black rounded-xs border-2 border-[#7C4320] shadow-md`}
          style={{ textShadow: "1px 2px 0px rgba(0,0,0,0.3)" }}
        >
          S
        </div>

        {/* Letter N - Magenta on Soft Pink */}
        <div
          className={`ransom-tile ${sizeConfig.letter} rotate-3 bg-[#FCE7F3] text-[#BE185D] font-sans font-black rounded-xs border-2 border-[#F472B6] shadow-md`}
          style={{ textShadow: "1px 1px 0px #FDF2F8, 2px 2px 0px rgba(190,24,93,0.3)" }}
        >
          N
        </div>

        {/* Letter A - Golden Roman Serif on Cream */}
        <div
          className={`ransom-tile ${sizeConfig.letter} -rotate-2 bg-[#FFFBEB] text-[#D97706] font-serif font-bold rounded-xs border-2 border-[#FDE68A] shadow-md`}
          style={{ textShadow: "1px 1px 0px #F59E0B" }}
        >
          A
        </div>

        {/* Letter C - Chrome/Metallic on Vivid Orange */}
        <div
          className={`ransom-tile ${sizeConfig.letter} rotate-6 bg-[#EA580C] text-[#FEF08A] font-sans font-extrabold rounded-xs border-2 border-[#C2410C] shadow-md`}
          style={{ textShadow: "1px 2px 0px #7C2D12" }}
        >
          C
        </div>

        {/* Letter K - Vintage Typewriter on Ivory */}
        <div
          className={`ransom-tile ${sizeConfig.letter} -rotate-3 bg-[#F5F5F4] text-[#1C1917] font-mono font-black rounded-xs border-2 border-[#D6D3D1] shadow-md`}
        >
          K
        </div>

        {/* Letter Y - Heavy Black Slab on Rose Pink */}
        <div
          className={`ransom-tile ${sizeConfig.letter} rotate-4 bg-[#FBCFE8] text-[#0F172A] font-serif font-black rounded-xs border-2 border-[#F472B6] shadow-md`}
        >
          Y
        </div>

        {/* Exclamation Marks ! ! - Newspaper Slip */}
        <div
          className={`ransom-tile ${sizeConfig.exclamation} -rotate-6 bg-[#E7E5E4] text-[#1C1917] font-sans font-black rounded-xs border-2 border-[#D6D3D1] shadow-md tracking-tighter`}
        >
          !!
        </div>

      </div>

      {/* 2. Handwritten Cursive Subtitle */}
      {showSubtitle && subtitleText && (
        <p
          className={`font-lillove font-bold text-[#9A6028] mt-2 sm:mt-3 ${sizeConfig.subtitle} tracking-wide drop-shadow-xs`}
        >
          {subtitleText}
        </p>
      )}
    </div>
  );
}

