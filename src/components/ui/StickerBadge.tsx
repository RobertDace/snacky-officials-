import React from "react";
import { clsx } from "clsx";

interface StickerBadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "blue" | "pink" | "sage" | "purple";
  className?: string;
  icon?: React.ReactNode;
}

export function StickerBadge({
  children,
  variant = "yellow",
  className,
  icon,
}: StickerBadgeProps) {
  const variantStyles = {
    yellow: "bg-amber-100/90 text-amber-900 border-amber-300/80 shadow-amber-200/50",
    blue: "bg-sky-100/90 text-sky-900 border-sky-300/80 shadow-sky-200/50",
    pink: "bg-pink-100/90 text-pink-900 border-pink-300/80 shadow-pink-200/50",
    sage: "bg-emerald-100/90 text-emerald-900 border-emerald-300/80 shadow-emerald-200/50",
    purple: "bg-purple-100/90 text-purple-900 border-purple-300/80 shadow-purple-200/50",
  }[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm transition-transform duration-200 hover:scale-105 select-none",
        variantStyles,
        className
      )}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}