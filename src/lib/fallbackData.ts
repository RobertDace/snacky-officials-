export interface FallbackComment {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  userId: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string | null;
    role: string;
  };
}

export interface FallbackPost {
  id: string;
  title: string;
  slug: string;
  category: "SINGLE" | "ALBUM" | "CONCERT" | "NEWS";
  summary: string;
  content: string;
  coverImage: string | null;
  audioUrl: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  ticketUrl: string | null;
  location: string | null;
  releaseDate: Date;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    comments: number;
  };
  comments?: FallbackComment[];
}

export const FALLBACK_POSTS: FallbackPost[] = [
  {
    id: "post-golden-meadow",
    title: "Golden Meadow (Acoustic Jazz Single)",
    slug: "golden-meadow-single",
    category: "SINGLE",
    summary: "My brand new acoustic single combining soft bossa nova rhythms with breezy indie-pop melodies.",
    content: `Hey everyone! 🌿 I am so excited to finally share "Golden Meadow" with all of you.

This song was written on a quiet sunny afternoon sitting with my acoustic guitar in the open fields outside Berlin. The chord progression combines classic jazz minor 9ths with a gentle bossa nova bounce that I hope warms your heart whenever you listen.

### Lyrics Snippet:
> *"Sunlight dripping through the pines,*
> *Gentle chords and mellow rhymes,*
> *Take my hand and let's go slow,*
> *Dancin' through the golden meadow..."*

Listen now on Spotify, watch the acoustic video on YouTube, and let me know your favorite lyric in the comments below! ✨`,
    coverImage: "/snacky-cover.jpg",
    audioUrl: "/audio/demo.mp3",
    spotifyUrl: "https://open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi",
    youtubeUrl: "https://youtube.com/@snacky_officially",
    ticketUrl: null,
    location: null,
    releaseDate: new Date("2026-05-15"),
    featured: true,
    published: true,
    createdAt: new Date("2026-05-15"),
    updatedAt: new Date("2026-05-15"),
    _count: { comments: 2 },
    comments: [
      {
        id: "c1",
        content: "That nylon guitar chord progression at 1:45 literally gave me chills! So cozy! ☕",
        createdAt: "2026-05-16T10:30:00.000Z",
        postId: "post-golden-meadow",
        userId: "u1",
        user: {
          id: "u1",
          username: "emily_jazzlover",
          avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
          role: "FAN",
        },
      },
      {
        id: "c2",
        content: "Listening from my morning commute in Berlin. Perfect vibe for cloudy mornings! 💛",
        createdAt: "2026-05-17T14:15:00.000Z",
        postId: "post-golden-meadow",
        userId: "u2",
        user: {
          id: "u2",
          username: "lucas_berlin",
          avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
          role: "FAN",
        },
      },
    ],
  },
  {
    id: "post-bossa-nova-river",
    title: "Bossa Nova by the River (Debut Release)",
    slug: "bossa-nova-by-the-river",
    category: "SINGLE",
    summary: "A breezy, nostalgic tribute to Stan Getz and Astrud Gilberto infused with modern indie acoustics.",
    content: `My debut single "Bossa Nova by the River" is officially out on all streaming platforms! 🎶

Growing up listening to bossa nova legends alongside 90s pop vinyl records shaped the soul of this track. From the soft nylon string guitar taps to the airy English vocal harmonies, this track is for your morning coffee and late afternoon train rides.

Special thanks to my producers in Germany for keeping the instrumentation organic, warm, and tactile!`,
    coverImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    audioUrl: "/audio/demo.mp3",
    spotifyUrl: "https://open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi",
    youtubeUrl: "https://youtube.com/@snacky_officially",
    ticketUrl: null,
    location: null,
    releaseDate: new Date("2026-03-20"),
    featured: false,
    published: true,
    createdAt: new Date("2026-03-20"),
    updatedAt: new Date("2026-03-20"),
    _count: { comments: 0 },
    comments: [],
  },
  {
    id: "post-snacky-live-berlin",
    title: "Snacky Live: Intimate Acoustic Night at Jazz Café Berlin",
    slug: "snacky-live-jazz-cafe-berlin",
    category: "CONCERT",
    summary: "Join me for an intimate live concert featuring original songs, jazz standards, and special acoustic covers.",
    content: `Berlin friends! ☕ I am thrilled to announce my upcoming live acoustic showcase at **Café Jazz Salon, Berlin**.

I will be performing full acoustic renditions of all my released singles, plus testing out unreleased tracks from my upcoming EP with a live double-bass accompanist.

- **Date:** Saturday, September 12, 2026
- **Doors Open:** 19:30 CET
- **Location:** Café Jazz Salon, Friedrichstraße, Berlin
- **Tickets:** Limited intimate seating (120 seats total)

Book your tickets early through the link below! I can't wait to sing with you all in person! 💛`,
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    audioUrl: null,
    spotifyUrl: null,
    youtubeUrl: "https://youtube.com/@snacky_officially",
    ticketUrl: "https://instagram.com/snacky_officially",
    location: "Café Jazz Salon — Berlin, Germany",
    releaseDate: new Date("2026-09-12"),
    featured: true,
    published: true,
    createdAt: new Date("2026-09-12"),
    updatedAt: new Date("2026-09-12"),
    _count: { comments: 0 },
    comments: [],
  },
  {
    id: "post-welcome-portal",
    title: "Welcome to My Official Scrapbook & Fan Portal! 🌸",
    slug: "welcome-to-my-official-scrapbook-portal",
    category: "NEWS",
    summary: "A personal letter from Snacky about why I built this scrapbook space for our music community.",
    content: `Welcome to my little corner of the internet! 🌼

I wanted a home for our community that feels like an authentic personal scrapbook — full of polaroids, handwritten notes, live recordings, and cozy conversations.

Here on the portal, you can:
1. Find direct links to all my music videos on YouTube & TikTok clips.
2. Read my full artist background in the **Bio** section.
3. Register your fan account to join discussions, comment under new releases, and get early tour updates!

Thank you so much for listening to my music and being part of this journey. Your love means the world to me! 💌

With love,  
*Snacky*`,
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    audioUrl: null,
    spotifyUrl: "https://open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi",
    youtubeUrl: "https://youtube.com/@snacky_officially",
    ticketUrl: null,
    location: null,
    releaseDate: new Date("2026-01-10"),
    featured: false,
    published: true,
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-10"),
    _count: { comments: 0 },
    comments: [],
  },
];

export function getFallbackPosts(category?: string, search?: string) {
  let list = [...FALLBACK_POSTS];
  if (category && category !== "ALL") {
    list = list.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }
  return list;
}

export function getFallbackPostBySlug(slug: string) {
  return FALLBACK_POSTS.find((p) => p.slug === slug || p.id === slug) || null;
}
