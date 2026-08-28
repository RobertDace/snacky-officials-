import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "You must be logged in as a fan or admin to comment." }, { status: 401 });
    }

    const body = await request.json();
    const { postId, content } = body;

    if (!postId || !content || !content.trim()) {
      return NextResponse.json({ error: "Post ID and comment content are required." }, { status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: user.id,
        content: content.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            role: true,
          }
        }
      }
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error: any) {
    console.error("POST comment error:", error);
    return NextResponse.json({ error: "Failed to post comment." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");

    if (!commentId) {
      return NextResponse.json({ error: "Comment ID is required." }, { status: 400 });
    }

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    // Fans can only delete their own comments, Admin can delete any comment
    if (user.role !== "ADMIN" && comment.userId !== user.id) {
      return NextResponse.json({ error: "You are not authorized to delete this comment." }, { status: 403 });
    }

    await prisma.comment.delete({ where: { id: commentId } });

    return NextResponse.json({ success: true, message: "Comment deleted successfully." });
  } catch (error: any) {
    console.error("DELETE comment error:", error);
    return NextResponse.json({ error: "Failed to delete comment." }, { status: 500 });
  }
}