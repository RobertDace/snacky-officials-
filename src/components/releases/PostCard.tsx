import React from "react";
import Link from "next/link";
import { WashiTape } from "@/components/ui/WashiTape";
import { Calendar, MapPin, MessageSquare, ArrowRight } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string | null;
    coverImage: string | null;
    releaseDate: Date | null;
    location: string | null;
    _count?: {
      comments: number;
    };
  };
  rotation?: "left" | "right" | "slight-left" | "slight-right" | "none";
}

export function PostCard({ post, rotation = "none" }: PostCardProps) {
  const categoryVariant = {
    SINGLE: "yellow",
    ALBUM: "pink",
    CONCERT: "sage",
    NEWS: "yellow",
    BEHIND_THE_SCENES: "blue",
  }[post.category] as any || "yellow";

  const formattedDate = post.releaseDate
    ? new Date(post.releaseDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group relative bg-white border-2 border-[#E7DFCE] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      <WashiTape color={categoryVariant} position="top-right" />

      <div>
        {/* Cover Photo */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100 mb-3.5 border border-stone-200">
          <img
            src={post.coverImage || "/snacky-cover.jpg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-coomfie font-bold uppercase tracking-wider bg-white/90 text-stone-800 shadow-xs backdrop-blur-xs">
              {post.category.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        {/* Post Metadata */}
        <div className="flex items-center gap-3 text-xs text-stone-500 mb-1.5 font-coomfie">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{formattedDate}</span>
            </span>
          )}
          {post.location && (
            <span className="flex items-center gap-1 text-emerald-800 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate max-w-[130px]">{post.location}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-coomfie font-bold text-stone-900 group-hover:text-[#9E5D32] transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>

        {/* Summary */}
        {post.summary && (
          <p className="font-coomfie text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
            {post.summary}
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-[#E7DFCE] flex items-center justify-between mt-auto font-coomfie">
        <span className="flex items-center gap-1 text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{post._count?.comments || 0}</span>
        </span>

        <Link
          href={`/releases/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#9E5D32] hover:bg-[#854B24] px-3.5 py-1.5 rounded-full transition-all hover:scale-105 shadow-2xs"
        >
          <span>Read & Listen</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}