"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { CommentItem } from "@/types";
import { MessageSquare, Send, Trash2, ShieldCheck, Heart } from "lucide-react";

interface CommentSectionProps {
  postId: string;
  initialComments: CommentItem[];
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!user) {
      setError("Please log in or create a fan account to post a comment.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: commentText.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit comment.");
      } else {
        setComments([data.comment, ...comments]);
        setCommentText("");
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete comment.");
      }
    } catch {
      alert("Failed to delete comment.");
    }
  };

  return (
    <section className="space-y-6 pt-8 border-t-2 border-dashed border-[#E7DFCE] font-coomfie">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-pink-100 rounded-xl text-pink-700">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-coomfie text-stone-900">
              Fan Discussion & Thoughts
            </h2>
            <p className="text-xs text-stone-500">
              {comments.length} {comments.length === 1 ? "comment" : "comments"} from listeners
            </p>
          </div>
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="p-5 bg-amber-50/80 border-2 border-amber-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <img
              src={user.avatarUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=SnackyFan&backgroundColor=ffd5dc"}
              alt={user.username}
              className="w-7 h-7 rounded-full border border-amber-300"
            />
            <span className="text-xs font-bold text-stone-800">
              Commenting as <span className="text-[#9E5D32]">{user.username}</span> {user.role === "ADMIN" && "(Admin)"}
            </span>
          </div>

          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts, favorite lyrics, or notes on this release..."
            className="w-full p-3 bg-white border border-[#E7DFCE] rounded-xl text-xs font-coomfie focus:outline-hidden focus:border-[#9E5D32] focus:ring-2 focus:ring-amber-200 resize-y"
            disabled={submitting}
          />

          {error && (
            <p className="text-xs font-semibold text-rose-600">{error}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#9E5D32] hover:bg-[#854B24] disabled:opacity-50 text-white font-bold text-xs rounded-full shadow-xs hover:shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Posting..." : "Post Comment"}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 bg-pink-50/90 border-2 border-dashed border-pink-200 rounded-2xl text-center space-y-3">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mx-auto" />
          <h3 className="font-coomfie text-base font-bold text-stone-800">
            Join the conversation
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Log in or create a free fan account to leave comments and connect with fellow listeners.
          </p>
          <div className="flex justify-center gap-3 pt-1">
            <Link
              href="/login"
              className="px-4 py-1.5 text-xs font-bold text-stone-800 bg-white border border-stone-300 rounded-full hover:bg-stone-50"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#9E5D32] rounded-full hover:bg-[#854B24] shadow-xs"
            >
              Join Fan Club
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="p-8 text-center bg-white border-2 border-[#E7DFCE] rounded-2xl">
            <p className="font-lillove text-3xl text-stone-500 font-bold">
              No comments yet. Be the first listener to leave a note!
            </p>
          </div>
        ) : (
          comments.map((cmt) => {
            const isAuthor = user?.id === cmt.userId;
            const isAdmin = user?.role === "ADMIN";
            const canDelete = isAuthor || isAdmin;

            return (
              <div
                key={cmt.id}
                className="p-4 bg-white border-2 border-[#E7DFCE] rounded-2xl shadow-2xs space-y-2 hover:border-stone-400 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={cmt.user.avatarUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=Fan&backgroundColor=ffd5dc"}
                      alt={cmt.user.username}
                      className="w-8 h-8 rounded-full border border-stone-200 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-900">
                          {cmt.user.username}
                        </span>
                        {cmt.user.role === "ADMIN" && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-amber-200 text-amber-950 text-[10px] font-bold rounded-full border border-amber-300">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            <span>Artist / Admin</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {new Date(cmt.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {canDelete && (
                    <button
                      onClick={() => handleDelete(cmt.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title={isAdmin && !isAuthor ? "Admin Moderation: Delete comment" : "Delete my comment"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-10">
                  {cmt.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}


