import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Admin User (Snacky / Kira)
  const hashedAdminPassword = await bcrypt.hash("snacky2026!admin", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@snackyofficial.com",
      username: "Snacky_Official",
      password: hashedAdminPassword,
      role: "ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
  });

  // 2. Create Demo Fan Users
  const hashedFanPassword = await bcrypt.hash("fanpassword123", 10);
  const fan1 = await prisma.user.create({
    data: {
      email: "emily.jazz@example.com",
      username: "emily_jazzlover",
      password: hashedFanPassword,
      role: "FAN",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    },
  });

  const fan2 = await prisma.user.create({
    data: {
      email: "lucas.b@example.com",
      username: "lucas_berlin",
      password: hashedFanPassword,
      role: "FAN",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
  });

  const fan3 = await prisma.user.create({
    data: {
      email: "sofia.m@example.com",
      username: "sofia_bossa",
      password: hashedFanPassword,
      role: "FAN",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    },
  });

  // 3. Create Posts
  const post1 = await prisma.post.create({
    data: {
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
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      spotifyUrl: "https://open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi",
      youtubeUrl: "https://youtube.com/@snacky_officially",
      releaseDate: new Date("2026-05-15"),
      published: true,
      featured: true,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Bossa Nova by the River (Debut Release)",
      slug: "bossa-nova-by-the-river",
      category: "SINGLE",
      summary: "A breezy, nostalgic tribute to Stan Getz and Astrud Gilberto infused with modern indie acoustics.",
      content: `My debut single "Bossa Nova by the River" is officially out on all streaming platforms! 🎶

Growing up listening to bossa nova legends alongside 90s pop vinyl records shaped the soul of this track. From the soft nylon string guitar taps to the airy English vocal harmonies, this track is for your morning coffee and late afternoon train rides.

Special thanks to my producers in Germany for keeping the instrumentation organic, warm, and tactile!`,
      coverImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
      spotifyUrl: "https://open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi",
      youtubeUrl: "https://youtube.com/@snacky_officially",
      releaseDate: new Date("2026-03-20"),
      published: true,
      featured: false,
    },
  });

  const post3 = await prisma.post.create({
    data: {
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
      location: "Café Jazz Salon — Berlin, Germany",
      ticketUrl: "https://instagram.com/snacky_officially",
      releaseDate: new Date("2026-09-12"),
      published: true,
      featured: true,
    },
  });

  const post4 = await prisma.post.create({
    data: {
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
      releaseDate: new Date("2026-01-10"),
      published: true,
      featured: false,
    },
  });

  // 4. Create Sample Comments
  await prisma.comment.create({
    data: {
      postId: post1.id,
      userId: fan1.id,
      content: "The guitar tones in Golden Meadow are pure magic! Such a peaceful vibe, played it on repeat all morning! ☕✨",
      createdAt: new Date("2026-05-16T10:24:00Z"),
    },
  });

  await prisma.comment.create({
    data: {
      postId: post1.id,
      userId: fan2.id,
      content: "That minor 9th chord progression is so lush. Can't wait to see you perform this live in Berlin! 🇩🇪",
      createdAt: new Date("2026-05-16T14:12:00Z"),
    },
  });

  await prisma.comment.create({
    data: {
      postId: post3.id,
      userId: fan3.id,
      content: "Just grabbed 2 tickets for the Berlin show! Bringing my best friend who loves bossa nova too! 🎉",
      createdAt: new Date("2026-06-01T09:00:00Z"),
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
