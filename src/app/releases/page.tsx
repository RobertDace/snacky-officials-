import React from "react";
import { prisma } from "@/lib/prisma";
import { CategoryFilter } from "@/components/releases/CategoryFilter";
import { PostCard } from "@/components/releases/PostCard";
import { WashiTape } from "@/components/ui/WashiTape";
import { Disc } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Releases & News | Snacky Official",
  description: "Explore all singles, concert announcements, album news, and behind-the-scenes stories from Snacky.",
};

export default async function ReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  let posts: any[] = [];
  try {
    const where: any = { published: true };

    if (category && category !== "ALL") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
        { content: { contains: search } },
      ];
    }

    posts = await prisma.post.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
  } catch (error) {
    console.error("Prisma error in ReleasesPage, using fallback data:", error);
  }

  if (!posts || posts.length === 0) {
    const { getFallbackPosts } = await import("@/lib/fallbackData");
    posts = getFallbackPosts(category, search);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Top Header Banner */}
      <section className="relative scrapbook-card p-6 sm:p-10 bg-white/95 overflow-hidden">
        <WashiTape color="yellow" position="top-left" />
        <WashiTape color="sage" position="top-right" />

        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-950 text-xs font-coomfie font-bold shadow-2xs">
            <Disc className="w-3.5 h-3.5 text-amber-700" />
            <span>Music Releases & Journal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-coomfie font-bold text-stone-900">
            Releases, Tours & News
          </h1>
          <p className="font-coomfie text-stone-600 text-xs sm:text-sm leading-relaxed">
            All the latest singles, upcoming live jazz showcases, lyric insights, and announcements from Snacky. Click on any post to stream and leave your comment!
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section>
        <CategoryFilter />
      </section>

      {/* Posts Grid */}
      <section>
        {posts.length === 0 ? (
          <div className="p-12 text-center bg-white border-2 border-dashed border-[#E7DFCE] rounded-3xl space-y-2">
            <p className="font-lillove text-3xl text-stone-500 font-bold">
              No matching posts or releases found!
            </p>
            <p className="font-coomfie text-xs text-stone-500">
              Try selecting another category or clearing your search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}