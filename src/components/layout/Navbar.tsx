"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SNACKY_INFO } from "@/lib/constants";
import { Music, User, ShieldCheck, LogOut, Menu, X, Heart, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { RansomTitle } from "@/components/ui/RansomTitle";
import { DaisyDoodle, BowRibbonDoodle } from "@/components/ui/DoodleDecorations";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", tag: "Hub" },
    { name: "Bio & Story", href: "/bio", tag: "About" },
    { name: "Releases & News", href: "/releases", tag: "Music" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7EE]/95 backdrop-blur-md border-b-2 border-[#E7DFCE] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Unique Ransom Cutout Mark & Cute Daisy Doodle */}
          <Link href="/" className="group relative flex items-center select-none py-1 pl-2">
            {/* Cute Daisy Doodle perched on the corner */}
            <div className="absolute -top-3.5 -left-1.5 z-20 pointer-events-none drop-shadow-2xs group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
              <DaisyDoodle className="w-6.5 h-6.5 text-stone-900" />
            </div>

            {/* The Unique Ransom Cutout Brand Logo */}
            <div className="group-hover:scale-105 transition-transform duration-200">
              <RansomTitle size="nav" showSubtitle={false} className="items-start" />
            </div>
          </Link>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex relative items-center">
            <div className="washi-strip washi-yellow -top-2.5 right-6 w-10 rotate-2 pointer-events-none" />
            
            <nav className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-full border border-[#E7DFCE] shadow-xs">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "px-4 py-1.5 text-xs font-coomfie font-bold rounded-full transition-all select-none",
                      isActive
                        ? "bg-[#9E5D32] text-white shadow-xs"
                        : "text-stone-700 hover:text-stone-950 hover:bg-stone-100"
                    )}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Auth Controls / CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                {user.role === "ADMIN" ? (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-300 text-amber-950 text-xs font-coomfie font-bold rounded-full border border-amber-400 shadow-xs hover:scale-105 transition-transform"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 bg-pink-100/90 border border-pink-200 rounded-full text-pink-900 text-xs font-coomfie font-semibold">
                    <Heart className="w-3 h-3 text-pink-600 fill-pink-600" />
                    <span>{user.username}</span>
                  </div>
                )}

                <button
                  onClick={() => logout()}
                  title="Logout"
                  className="p-2 text-stone-500 hover:text-rose-600 rounded-full hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-coomfie">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 rounded-full hover:bg-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#9E5D32] hover:bg-[#854B24] rounded-full shadow-xs hover:shadow-sm transition-all"
                >
                  Join Fan Club
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-[#E7DFCE] bg-[#FAF7EE] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col gap-1.5 font-coomfie">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between",
                    isActive
                      ? "bg-[#9E5D32] text-white"
                      : "text-stone-700 hover:bg-white"
                  )}
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 text-stone-800">
                    {link.tag}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E7DFCE] flex flex-col gap-2 font-coomfie">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-stone-600" />
                    <span className="text-xs font-bold text-stone-800">{user.username}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 font-bold hover:underline"
                  >
                    Logout
                  </button>
                </div>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-xs"
                  >
                    Go to Admin Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 font-coomfie">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-stone-700 bg-white rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-white bg-[#9E5D32] rounded-xl"
                >
                  Join Fan Club
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}