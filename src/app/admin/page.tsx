"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { WashiTape } from "@/components/ui/WashiTape";
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  MessageCircle, 
  FileText, 
  Music
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
      return;
    }

    if (user?.role === "ADMIN") {
      fetchAdminData();
    }
  }, [user, authLoading, router]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const postsRes = await fetch("/api/posts?includeDrafts=true");
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);

      const allComments: any[] = [];
      for (const p of postsData.posts || []) {
        const postDetailRes = await fetch(`/api/posts/${p.id}`);
        const postDetail = await postDetailRes.json();
        if (postDetail.post?.comments) {
          allComments.push(
            ...postDetail.post.comments.map((c: any) => ({
              ...c,
              postTitle: p.title,
              postSlug: p.slug,
            }))
          );
        }
      }
      setComments(allComments);
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also remove all its comments.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== postId));
        setComments(comments.filter((c) => c.postId !== postId));
      } else {
        alert("Failed to delete post.");
      }
    } catch {
      alert("Network error.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to remove this comment as admin?")) return;

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, { method: "DELETE" });
      if (res.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
        setPosts(
          posts.map((p) => {
            if (p._count) {
              return { ...p, _count: { comments: Math.max(0, p._count.comments - 1) } };
            }
            return p;
          })
        );
      } else {
        alert("Failed to delete comment.");
      }
    } catch {
      alert("Network error.");
    }
  };

  if (authLoading || (!user && loading)) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500 font-semibold animate-pulse">Checking authorization...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <section className="relative paper-card p-6 sm:p-10 bg-white overflow-hidden">
        <WashiTape color="yellow" position="top-left" />
        <WashiTape color="sage" position="top-right" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 text-amber-950 text-xs font-bold rounded-full border border-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Artist Admin Suite</span>
              </span>
              <span className="text-xs text-stone-500 font-medium">Logged in as Snacky Official</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-stone-900">
              Content & Community Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Manage your song releases, concert announcements, album teasers, and moderate fan comments.
            </p>
          </div>

          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm rounded-full shadow-xs hover:scale-105 transition-transform shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Release</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-stone-200">
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-200 rounded-xl text-amber-900">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase">Total Posts</p>
              <p className="text-2xl font-bold text-stone-900">{posts.length}</p>
            </div>
          </div>

          <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-pink-200 rounded-xl text-pink-900">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase">Fan Comments</p>
              <p className="text-2xl font-bold text-stone-900">{comments.length}</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-200 rounded-xl text-emerald-900">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase">Music Singles</p>
              <p className="text-2xl font-bold text-stone-900">
                {posts.filter((p) => p.category === "SINGLE" || p.category === "ALBUM").length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-2 border-b-2 border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-5 py-2 text-sm font-bold rounded-full transition-colors ${
            activeTab === "posts"
              ? "bg-amber-400 text-amber-950 shadow-xs"
              : "bg-white text-stone-600 hover:bg-stone-100"
          }`}
        >
          Manage Releases & Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-5 py-2 text-sm font-bold rounded-full transition-colors ${
            activeTab === "comments"
              ? "bg-amber-400 text-amber-950 shadow-xs"
              : "bg-white text-stone-600 hover:bg-stone-100"
          }`}
        >
          Comment Moderation ({comments.length})
        </button>
      </div>

      {activeTab === "posts" && (
        <section className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold">
                <tr>
                  <th className="p-4">Post & Category</th>
                  <th className="p-4">Release Date</th>
                  <th className="p-4">Comments</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {post.coverImage && (
                          <img
                            src={post.coverImage}
                            alt=""
                            className="w-12 h-9 rounded object-cover border border-stone-200 shrink-0"
                          />
                        )}
                        <div>
                          <p className="font-bold text-stone-900 text-sm">{post.title}</p>
                          <span className="inline-block px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-full mt-0.5">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-stone-600 font-medium">
                      {post.releaseDate
                        ? new Date(post.releaseDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-pink-100 text-pink-900 rounded-full font-bold text-[11px]">
                        {post._count?.comments || 0} comments
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          post.published
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/releases/${post.slug}`}
                          target="_blank"
                          className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                          title="View Live Post"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/edit/${post.id}`}
                          className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg"
                          title="Edit Post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "comments" && (
        <section className="bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Live Fan Comments Feed</h2>
              <p className="text-xs text-stone-500">
                You can remove spam, off-topic, or inappropriate comments with 1 click.
              </p>
            </div>
          </div>

          {comments.length === 0 ? (
            <div className="p-8 text-center text-stone-400">No comments found in database.</div>
          ) : (
            <div className="divide-y divide-stone-100">
              {comments.map((cmt) => (
                <div key={cmt.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={cmt.user?.avatarUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=Fan&backgroundColor=ffd5dc"}
                      alt=""
                      className="w-8 h-8 rounded-full border border-stone-200 mt-0.5"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-xs">{cmt.user?.username}</span>
                        <span className="text-[10px] text-stone-400">
                          on post:{" "}
                          <Link href={`/releases/${cmt.postSlug}`} className="text-amber-800 font-semibold hover:underline">
                            {cmt.postTitle}
                          </Link>
                        </span>
                        <span className="text-[10px] text-stone-400">
                          • {new Date(cmt.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200 max-w-2xl">
                        {cmt.content}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteComment(cmt.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                    title="Delete Comment Immediately"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

