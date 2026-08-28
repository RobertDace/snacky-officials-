"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { WashiTape } from "@/components/ui/WashiTape";
import { ArrowLeft, Save } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAuth();

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content) {
      setError("Title, Category, and Content are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
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
        setError(data.error || "Failed to create post.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <WashiTape color="yellow" position="top-center" />

        <div className="border-b border-stone-200 pb-4">
          <h1 className="text-3xl font-bold font-serif-display text-stone-900">
            Publish New Release or News
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Add a new song single, concert announcement, lyric journal, or behind-the-scenes article.
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
                placeholder="e.g. Moonlight In Lisbon (Acoustic Single)"
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-400 font-medium"
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
            <label className="text-xs font-bold text-stone-700">Short Summary (Preview)</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A brief 1-2 sentence hook displayed on cards and search results..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Full Content / Lyrics / Story *</label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full story, chord notes, lyric lines, or event information here..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Cover Image URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/... or your image link"
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
                placeholder="https://open.spotify.com/..."
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">YouTube Link</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/..."
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
                  placeholder="e.g. Jazz Club Munich — Germany"
                  className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-900">Tickets Link</label>
                <input
                  type="url"
                  value={ticketUrl}
                  onChange={(e) => setTicketUrl(e.target.value)}
                  placeholder="https://eventbrite.com/..."
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
              <span className="text-xs font-bold text-stone-800">Publish Immediately</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-400"
              />
              <span className="text-xs font-bold text-stone-800">Featured on Home Spotlight</span>
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
              <span>{submitting ? "Saving..." : "Save & Publish Post"}</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}