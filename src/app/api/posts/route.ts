import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    const user = await getCurrentUser();
    const isAdmin = user?.role === "ADMIN";

    const where: any = {};
    
    if (!isAdmin || !includeDrafts) {
      where.published = true;
    }

    if (category && category !== "ALL") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
        { content: { contains: search } }
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" }
      ],
      include: {
        _count: {
          select: { comments: true }
        }
      }
    });

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error("GET posts error, returning fallback:", error);
    const { getFallbackPosts } = await import("@/lib/fallbackData");
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    return NextResponse.json({ posts: getFallbackPosts(category, search) });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin access only." }, { status: 403 });
    }

    const body = await request.json();
    const { title, category, content, summary, coverImage, spotifyUrl, youtubeUrl, releaseDate, location, ticketUrl, published, featured } = body;

    if (!title || !category || !content) {
      return NextResponse.json({ error: "Title, category, and content are required." }, { status: 400 });
    }

    let baseSlug = slugify(title);
    let uniqueSlug = baseSlug;
    let count = 1;
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug: uniqueSlug,
        category,
        content,
        summary: summary || null,
        coverImage: coverImage || null,
        spotifyUrl: spotifyUrl || null,
        youtubeUrl: youtubeUrl || null,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        location: location || null,
        ticketUrl: ticketUrl || null,
        published: published ?? true,
        featured: featured ?? false,
      }
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    console.error("POST post error:", error);
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
