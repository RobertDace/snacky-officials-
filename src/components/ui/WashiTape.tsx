import React from "react";
import { clsx } from "clsx";

interface WashiTapeProps {
  color?: "yellow" | "blue" | "pink" | "sage";
  className?: string;
  position?: "top-left" | "top-right" | "top-center" | "custom";
}

export function WashiTape({ color = "yellow", className, position = "top-center" }: WashiTapeProps) {
  const colorClass = {
    yellow: "washi-yellow",
    blue: "washi-blue",
    pink: "washi-pink",
    sage: "washi-sage",
  }[color];

  const posClass = {
    "top-left": "-top-3 -left-3 -rotate-12 w-20",
    "top-right": "-top-3 -right-3 rotate-12 w-20",
    "top-center": "-top-3 left-1/2 -translate-x-1/2 -rotate-1 w-24",
    custom: "",
  }[position];

  return (
    <div
      className={clsx(
        "washi-tape pointer-events-none select-none",
        colorClass,
        posClass,
        className
      )}
      aria-hidden="true"
    />
  );
}