"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SNACKY_INFO } from "@/lib/constants";
import { WashiTape } from "@/components/ui/WashiTape";
import { Heart, User, Mail, Lock, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(SNACKY_INFO.defaultAvatars[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          avatarUrl: selectedAvatar,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
      } else {
        login(data.user);
        router.push("/releases");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 font-coomfie">
      <div className="relative scrapbook-card p-6 sm:p-8 bg-white/95 overflow-hidden space-y-6">
        <WashiTape color="pink" position="top-center" />

        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-pink-100 rounded-2xl border border-pink-300">
            <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-coomfie text-stone-900">
            Join the Fan Club
          </h1>
          <p className="text-xs text-stone-500">
            Create your account to comment on new releases and stay tuned for concerts!
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700">
            Pick Your Avatar
          </label>
          <div className="flex items-center justify-center gap-2 p-3 bg-stone-50 border border-[#E7DFCE] rounded-2xl">
            {SNACKY_INFO.defaultAvatars.map((av, idx) => {
              const isSelected = selectedAvatar === av;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`relative p-1 rounded-full transition-transform ${
                    isSelected
                      ? "scale-115 ring-2 ring-[#9E5D32] bg-amber-100"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img src={av} alt="Avatar option" className="w-9 h-9 rounded-full" />
                  {isSelected && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 bg-[#9E5D32] rounded-full text-white">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. jazz_listener_24"
                className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-[#E7DFCE] rounded-xl text-xs font-coomfie"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-[#E7DFCE] rounded-xl text-xs font-coomfie"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-[#E7DFCE] rounded-xl text-xs font-coomfie"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#9E5D32] hover:bg-[#854B24] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-sm transition-all"
          >
            {loading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-600 border-t border-[#E7DFCE]">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-[#9E5D32] hover:underline">
            Log In here
          </Link>
        </div>
      </div>
    </div>
  );
}
