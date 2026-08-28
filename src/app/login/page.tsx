"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { WashiTape } from "@/components/ui/WashiTape";
import { Lock, User, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
      } else {
        login(data.user);
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/releases");
        }
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setIdentifier("admin@snackyofficial.com");
    setPassword("snacky2026!admin");
  };

  const fillDemoFan = () => {
    setIdentifier("emily_jazzlover");
    setPassword("fanpassword123");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 font-coomfie">
      <div className="relative scrapbook-card p-6 sm:p-8 bg-white/95 overflow-hidden space-y-6">
        <WashiTape color="yellow" position="top-center" />

        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-amber-100 rounded-2xl border border-amber-300">
            <Lock className="w-6 h-6 text-amber-800" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-coomfie text-stone-900">
            Welcome Back
          </h1>
          <p className="text-xs text-stone-500">
            Log in to comment on releases or access the artist dashboard
          </p>
        </div>

        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
          <p className="text-[10px] font-bold text-amber-950 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Quick 1-Click Demo Login</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="py-1.5 px-2 bg-amber-200 hover:bg-amber-300 text-amber-950 text-[10px] font-bold rounded-lg border border-amber-400 transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Fill Admin (Snacky)</span>
            </button>
            <button
              type="button"
              onClick={fillDemoFan}
              className="py-1.5 px-2 bg-pink-100 hover:bg-pink-200 text-pink-900 text-[10px] font-bold rounded-lg border border-pink-300 transition-colors flex items-center justify-center gap-1"
            >
              <Heart className="w-3 h-3 text-pink-600" />
              <span>Fill Fan Account</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">
              Email or Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@snackyofficial.com or username"
                className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-[#E7DFCE] rounded-xl text-xs font-coomfie focus:outline-hidden focus:border-[#9E5D32] focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-[#E7DFCE] rounded-xl text-xs font-coomfie focus:outline-hidden focus:border-[#9E5D32] focus:ring-2 focus:ring-amber-200"
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
            {loading ? "Authenticating..." : "Log In to Account"}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-600 border-t border-[#E7DFCE]">
          <span>Don&apos;t have a fan account yet? </span>
          <Link href="/register" className="font-bold text-[#9E5D32] hover:underline">
            Register for Free
          </Link>
        </div>

      </div>
    </div>
  );
}