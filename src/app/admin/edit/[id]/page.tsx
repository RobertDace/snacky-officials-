"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { WashiTape } from "@/components/ui/WashiTape";
import { ArrowLeft, Save } from "lucide-react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = use(params);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SINGLE");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [location, setLocation] = useState("");
  const [ticketUrl, setTicketUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      if (data.post) {
        const p = data.post;
        setTitle(p.title);
        setCategory(p.category);
        setSummary(p.summary || "");
        setContent(p.content);
        setCoverImage(p.coverImage || "");
        setSpotifyUrl(p.spotifyUrl || "");
        setYoutubeUrl(p.youtubeUrl || "");
        if (p.releaseDate) {
          setReleaseDate(new Date(p.releaseDate).toISOString().split("T")[0]);
        }
        setLocation(p.location || "");
        setTicketUrl(p.ticketUrl || "");
        setPublished(p.published);
        setFeatured(p.featured);
      }
    } catch {
      setError("Failed to load post.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          summary,
          content,
          coverImage,
          spotifyUrl,
          youtubeUrl,
          releaseDate: releaseDate ? new Date(releaseDate).toISOString() : null,
          location,
          ticketUrl,
          published,
          featured,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update post.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-stone-500">
        Loading post data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-800 bg-white border border-stone-200 px-3.5 py-1.5 rounded-full shadow-2xs transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Admin Dashboard</span>
      </Link>

      <div className="relative paper-card p-6 sm:p-10 bg-white overflow-hidden space-y-6">
        <WashiTape color="sage" position="top-center" />

        <div className="border-b border-stone-200 pb-4">
          <h1 className="text-3xl font-bold font-serif-display text-stone-900">
            Edit Post & Release
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Updating: <span className="font-bold text-amber-800">{title}</span>
          </p>
        </div>

        {error && (
          <p className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-stone-700">Post Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium"
              >
                <option value="SINGLE">Single Release</option>
                <option value="ALBUM">Album / EP</option>
                <option value="CONCERT">Concert / Tour</option>
                <option value="NEWS">News / Letter</option>
                <option value="BEHIND_THE_SCENES">Behind The Scenes</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Short Summary</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Full Content / Lyrics *</label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Cover Image URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Release Date</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Spotify Link</label>
              <input
                type="url"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">YouTube Link</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
          </div>

          {category === "CONCERT" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-900">Venue & City Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-900">Tickets Link</label>
                <input
                  type="url"
                  value={ticketUrl}
                  onChange={(e) => setTicketUrl(e.target.value)}
                  className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-sm"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-400"
              />
              <span className="text-xs font-bold text-stone-800">Published</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-400"
              />
              <span className="text-xs font-bold text-stone-800">Featured on Spotlight</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <Link
              href="/admin"
              className="px-5 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-amber-950 font-bold text-xs rounded-full shadow-xs hover:scale-105 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? "Updating..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

