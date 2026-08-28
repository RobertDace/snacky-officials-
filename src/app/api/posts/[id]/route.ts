import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
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
                role: true
              }
            }
          }
        },
        _count: {
          select: { comments: true }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error: any) {
    console.error("GET single post error:", error);
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin access only." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, category, content, summary, coverImage, spotifyUrl, youtubeUrl, releaseDate, location, ticketUrl, published, featured } = body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : undefined,
        category: category !== undefined ? category : undefined,
        content: content !== undefined ? content : undefined,
        summary: summary !== undefined ? summary : undefined,
        coverImage: coverImage !== undefined ? coverImage : undefined,
        spotifyUrl: spotifyUrl !== undefined ? spotifyUrl : undefined,
        youtubeUrl: youtubeUrl !== undefined ? youtubeUrl : undefined,
        releaseDate: releaseDate !== undefined ? (releaseDate ? new Date(releaseDate) : null) : undefined,
        location: location !== undefined ? location : undefined,
        ticketUrl: ticketUrl !== undefined ? ticketUrl : undefined,
        published: published !== undefined ? published : undefined,
        featured: featured !== undefined ? featured : undefined,
      }
    });

    return NextResponse.json({ post });
  } catch (error: any) {
    console.error("PUT post error:", error);
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin access only." }, { status: 403 });
    }

    const { id } = await params;
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Post deleted successfully." });
  } catch (error: any) {
    console.error("DELETE post error:", error);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}