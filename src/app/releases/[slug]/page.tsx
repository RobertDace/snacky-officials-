import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WashiTape } from "@/components/ui/WashiTape";
import { CommentSection } from "@/components/releases/CommentSection";
import { SpotifyIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import { 
  Calendar, 
  MapPin, 
  Music, 
  Ticket, 
  ArrowLeft, 
  ExternalLink
} from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
    },
  });

  if (!post) return { title: "Post Not Found | Snacky Official" };

  return {
    title: `${post.title} | Snacky Official`,
    description: post.summary || post.title,
  };
}

export default async function SingleReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
      published: true,
    },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const categoryVariant = ({
    SINGLE: "yellow",
    ALBUM: "pink",
    CONCERT: "sage",
    NEWS: "yellow",
    BEHIND_THE_SCENES: "blue",
  } as any)[post.category] || "yellow";

  const formattedDate = post.releaseDate
    ? new Date(post.releaseDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 font-coomfie">
      <Link
        href="/releases"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 bg-white border border-[#E7DFCE] px-3.5 py-1.5 rounded-full shadow-2xs transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all Releases</span>
      </Link>

      <article className="relative scrapbook-card p-6 sm:p-10 lg:p-12 bg-white/95 overflow-hidden space-y-8">
        <WashiTape color={categoryVariant} position="top-center" />

        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7DFCE]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-950 text-xs font-bold rounded-full border border-amber-300">
              {post.category.replace(/_/g, " ")}
            </span>
            {post.featured && (
              <span className="px-3 py-1 bg-pink-100 text-pink-950 text-xs font-bold rounded-full border border-pink-300">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-500">
            {formattedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{formattedDate}</span>
              </span>
            )}
            {post.location && (
              <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{post.location}</span>
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-coomfie font-bold text-stone-900 leading-tight">
            {post.title}
          </h1>
          {post.summary && (
            <p className="font-coomfie text-base sm:text-lg text-stone-600 leading-relaxed">
              {post.summary}
            </p>
          )}
        </div>

        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border-2 border-[#E7DFCE] shadow-sm">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {(post.spotifyUrl || post.youtubeUrl || post.ticketUrl) && (
          <div className="p-4 bg-amber-50/90 border-2 border-amber-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-amber-800" />
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Official Links
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {post.spotifyUrl && (
                <a
                  href={post.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1DB954] hover:bg-[#1AA34A] text-white text-xs font-bold rounded-full shadow-2xs hover:scale-105 transition-transform"
                >
                  <SpotifyIcon className="w-3.5 h-3.5" />
                  <span>Stream on Spotify</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              )}
              {post.youtubeUrl && (
                <a
                  href={post.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold rounded-full shadow-2xs hover:scale-105 transition-transform"
                >
                  <YouTubeIcon className="w-3.5 h-3.5" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              )}
              {post.ticketUrl && (
                <a
                  href={post.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#9E5D32] hover:bg-[#854B24] text-white text-xs font-bold rounded-full shadow-2xs hover:scale-105 transition-transform"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book Tickets</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="font-coomfie text-stone-800 leading-relaxed space-y-4 text-sm sm:text-base whitespace-pre-line">
          {post.content}
        </div>

        <div className="pt-6 border-t border-[#E7DFCE] flex items-center justify-between">
          <p className="font-lillove text-3xl text-[#9A6028] font-bold">
            ~ With love, Snacky
          </p>
          <span className="font-coomfie text-xs text-stone-400">
            Share this story with fellow listeners
          </span>
        </div>

        <CommentSection
          postId={post.id}
          initialComments={post.comments.map((c) => ({
            id: c.id,
            content: c.content,
            createdAt: c.createdAt.toISOString(),
            postId: c.postId,
            userId: c.userId,
            user: {
              id: c.user.id,
              username: c.user.username,
              avatarUrl: c.user.avatarUrl,
              role: c.user.role,
            },
          }))}
        />
      </article>
    </div>
  );
}

