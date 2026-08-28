import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { WashiTape } from "./WashiTape";

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  rotation?: "left" | "right" | "slight-left" | "slight-right" | "none";
  tapeColor?: "yellow" | "blue" | "pink" | "sage";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function Polaroid({
  src,
  alt,
  caption,
  date,
  rotation = "slight-left",
  tapeColor = "yellow",
  className,
  imageClassName,
  priority = false,
}: PolaroidProps) {
  const rotateClass = {
    left: "-rotate-3 hover:-rotate-1",
    right: "rotate-3 hover:rotate-1",
    "slight-left": "-rotate-1 hover:rotate-0",
    "slight-right": "rotate-1 hover:rotate-0",
    none: "rotate-0",
  }[rotation];

  return (
    <div
      className={clsx(
        "relative p-3 pb-6 polaroid-card rounded-lg transition-transform duration-300",
        rotateClass,
        className
      )}
    >
      <WashiTape color={tapeColor} position="top-center" />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-stone-100">
        <img
          src={src}
          alt={alt}
          className={clsx("h-full w-full object-cover transition-transform duration-500 hover:scale-105", imageClassName)}
        />
      </div>
      {(caption || date) && (
        <div className="mt-3 flex items-center justify-between px-1">
          {caption && (
            <p className="font-handwriting text-xl text-stone-700 font-semibold tracking-wide">
              {caption}
            </p>
          )}
          {date && (
            <span className="font-handwriting text-sm text-stone-400 font-medium">
              {date}
            </span>
          )}
        </div>
      )}
    </div>
  );
}