import type { Metadata } from "next";
import { Comfortaa, Caveat, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayerWidget } from "@/components/ui/AudioPlayerWidget";

// "coomfie" - Cozy, bubbly, rounded typography
const coomfie = Comfortaa({
  subsets: ["latin"],
  variable: "--font-coomfie",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// "lillove" - Cute, romantic handwritten script
const lillove = Caveat({
  subsets: ["latin"],
  variable: "--font-lillove",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snacky Official | Singer-Songwriter — Jazz, Bossa Nova & Indie Pop",
  description: "Official music scrapbook for singer-songwriter Snacky. Explore original jazz & bossa nova singles, acoustic videos, live dates, and community journal.",
  keywords: ["Snacky", "Snacky Music", "Jazz Singer", "Bossa Nova Singer", "Berlin Musician", "Indie Pop", "Acoustic Pop", "Snacky Official"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${coomfie.variable} ${lillove.variable} ${jakarta.variable} ${playfair.variable}`}
    >
      <body className="antialiased selection:bg-pink-200 selection:text-pink-950 font-sans">
        <AuthProvider>
          <div className="flex min-h-screen flex-col relative overflow-x-hidden">
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
            <AudioPlayerWidget />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

