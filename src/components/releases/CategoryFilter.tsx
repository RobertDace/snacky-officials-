"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { clsx } from "clsx";

const CATEGORIES = [
  { id: "ALL", label: "All Releases" },
  { id: "SINGLE", label: "Singles" },
  { id: "ALBUM", label: "Albums & EPs" },
  { id: "CONCERT", label: "Concerts & Live" },
  { id: "NEWS", label: "Journal & Letters" },
  { id: "BEHIND_THE_SCENES", label: "Behind The Scenes" },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "ALL";
  const currentSearch = searchParams.get("search") || "";

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "ALL") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`/releases?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    router.push(`/releases?${params.toString()}`);
  };

  return (
    <div className="space-y-4 font-coomfie">
      <div className="relative max-w-md mx-auto sm:mx-0">
        <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search songs, lyrics, live dates..."
          defaultValue={currentSearch}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#E7DFCE] rounded-full text-xs font-coomfie focus:outline-hidden focus:border-[#9E5D32] focus:ring-2 focus:ring-amber-200 shadow-2xs transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {CATEGORIES.map((cat) => {
          const isSelected = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={clsx(
                "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold transition-all select-none",
                isSelected
                  ? "bg-[#9E5D32] text-white shadow-xs scale-102"
                  : "bg-white text-stone-700 border border-[#E7DFCE] hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

