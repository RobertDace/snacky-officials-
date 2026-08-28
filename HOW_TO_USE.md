# 🌸 Snacky Official Portal — User Guide & Manual

Welcome to the **Snacky Official Music & Scrapbook Portal**! This document provides a complete guide on how to navigate, interact with, and manage the official website for indie jazz & bossa nova artist **Snacky**.

---

## 📑 Table of Contents
1. [Overview & Artistic Concept](#-overview--artistic-concept)
2. [Visitor & Fan Guide](#-visitor--fan-guide)
   - [Interactive Home Scrapbook](#1-interactive-home-scrapbook)
   - [Floating Audio Player](#2-floating-audio-player)
   - [Bio & Artist Journey](#3-bio--artist-journey)
   - [Music Releases & Journal Entries](#4-music-releases--journal-entries)
   - [Community Comments & Discussions](#5-community-comments--discussions)
3. [Fan Club Authentication](#-fan-club-authentication)
   - [Creating a Fan Account](#creating-a-fan-account)
   - [Signing In](#signing-in)
4. [Admin Portal & Content Management](#-admin-portal--content-management)
   - [Admin Access & Login](#admin-access--login)
   - [Admin Dashboard Overview](#admin-dashboard-overview)
   - [Publishing a New Release / Story](#publishing-a-new-release--story)
   - [Editing & Deleting Existing Entries](#editing--deleting-existing-entries)
5. [Official Social & Streaming Links](#-official-social--streaming-links)
6. [Tech Stack & Development Notes](#-tech-stack--development-notes)

---

## 🎨 Overview & Artistic Concept

Snacky is a Berlin-based Ukrainian indie acoustic singer-songwriter blending soft **bossa nova rhythms**, **warm acoustic jazz progressions**, and **English indie-pop storytelling**. 

This web portal is designed as an **authentic tactile scrapbook**:
- Hand-drawn doodles (daisies, bunnies, ribbons, hearts, vinyl records).
- Textured washi tape and vintage kraft paper cards.
- Seamless audio listening widget for instant song previews.
- Official brand links to Spotify, TikTok, Instagram, and YouTube.

---

## 🎧 Visitor & Fan Guide

### 1. Interactive Home Scrapbook (`/`)
- **Hero Section:** Features Snacky's official polaroid portrait with original handwritten artwork, introductory badge, and one-click access to Spotify and latest releases.
- **Floating Music Player:** Listen to featured acoustic audio directly inside the browser while scrolling through the page.
- **Streaming Scrapbook Hub:** 4 interactive cards linking directly to:
  - 🟢 **Spotify:** Official artist discography and playlist streaming.
  - ⚫ **TikTok:** Snacky's official clips, acoustic guitar snippets, and behind-the-scenes moments (`@snacky206`).
  - 🟣 **Instagram:** Tour snapshots, studio photos, and aesthetic stories.
  - 🔴 **YouTube:** Official music videos and live acoustic showcases.
- **Featured Single Card:** Highlights the spotlight release with cover art, release date, badges, and direct streaming links.
- **Recent Journal & Community Cards:** Quick overview of recent musical milestones and fan discussions.

---

### 2. Floating Audio Player
Located at the bottom right of the screen across all pages:
- **Play / Pause Button:** Toggle playback of Snacky's preview track.
- **Track Info:** Displays the current song title and artist tag.
- **Track Progress Bar:** Interactive scrubber to seek through the song.
- **Volume & Mute Controls:** Adjust or mute the volume easily.
- **Spotify Direct Link:** Instantly jump to Spotify for full lossless playback.

---

### 3. Bio & Artist Journey (`/bio`)
Discover the backstory of Snacky:
- **Artistic Identity:** Her evolution from classical piano and violin in Ukraine to acoustic guitar songwriting and bossa nova jazz in Berlin.
- **Sonic Influences:** Stan Getz, Astrud Gilberto, Laufey, and cozy bedroom pop.
- **Scrapbook Memories Grid:** Polaroid cards showcasing acoustic sessions, vinyl inspiration, and studio journaling.
- **Equipment & Tone:** Insight into nylon-string acoustic guitars, tube preamps, and intimate vocal arrangements.

---

### 4. Music Releases & Journal Entries (`/releases`)
Explore Snacky's complete discography and announcements:
- **Category Filter Tabs:**
  - `All Entries`: Complete catalog view.
  - `Singles`: Acoustic singles and collaborations.
  - `Albums & EPs`: Full length projects and EP tracks.
  - `Concerts & Tours`: Upcoming live tour dates, venues, and ticket links.
  - `Journal & News`: Personal letters, chords breakdowns, and stories.
- **Search Bar:** Real-time search by title, lyrics keywords, or summary topics.
- **Post Cards:** Visual scrapbook cards with category stamps, release dates, and comment counters.

---

### 5. Community Comments & Discussions (`/releases/[slug]`)
Clicking any release opens the dedicated release page:
- **Full Story & Lyrics Snippets:** In-depth background on the inspiration and chords.
- **Streaming & Ticket Action Buttons:** Direct links to Spotify, YouTube, or Ticket reservations.
- **Fan Discussion Section:**
  - Registered fans can leave thoughts, ask chord questions, or share listening vibes.
  - Live celebratory confetti triggers when posting your first comment!
  - Real-time timestamp and custom fan avatar display.

---

## 🔐 Fan Club Authentication

### Creating a Fan Account (`/register`)
1. Click **Join Fan Club** in the top navigation bar or footer.
2. Enter your desired **Username**, **Email Address**, and **Password** (min. 6 characters).
3. Click **Join Fan Club** to automatically create your session and be redirected to the scrapbook portal.

### Signing In (`/login`)
1. Click **Log In** in the top navigation.
2. Enter your registered email and password.
3. Once logged in, your username and role badge will appear in the navigation bar, unlocking instant commenting privileges.

---

## 👑 Admin Portal & Content Management

The Snacky portal includes a built-in Content Management System (CMS) designed specifically for the artist and management team.

### Admin Access & Login
- **Login Route:** Navigate to `/login`.
- **Default Seed Admin Credentials:**
  - **Email:** `admin@snackyofficial.com`
  - **Password:** `snacky2026!admin`
- When logged in as an administrator, an **Admin Portal** button with a golden crown icon appears in the top navigation bar.

---

### Admin Dashboard Overview (`/admin`)
The dashboard provides a real-time command center:
1. **Summary Metrics:**
   - Total Published Releases.
   - Unpublished Drafts.
   - Total Community Fan Comments.
2. **Post Catalog Table:**
   - Title & Slug.
   - Category badge (`SINGLE`, `ALBUM`, `CONCERT`, `NEWS`).
   - Publication status (`Published` or `Draft`).
   - Action buttons: **Edit** and **Delete**.
3. **Quick Action:** **+ Create New Entry** button.

---

### Publishing a New Release / Story (`/admin/new`)
Fill out the intuitive post creation form:
- **Basic Info:** Title, URL Slug (auto-generated from title if left blank), Category, and Release Date.
- **Cover Image & Audio Preview:** URL to the album cover artwork and optional MP3 preview URL.
- **Summary:** Short 1-2 sentence preview shown on cards.
- **Full Content (Markdown Supported):** Write lyrics, chord guides, behind-the-scenes stories, or tour details.
- **External Integration Links:**
  - **Spotify URL:** Link to Spotify track or album.
  - **YouTube URL:** Link to official music video.
  - **Ticket URL & Venue Location:** (For Concert announcements).
- **Featured Spotlight Checkbox:** Check to feature this release on the main homepage scrapbook.
- **Publish Status:** Choose to publish immediately or save as a draft.

---

### Editing & Deleting Existing Entries (`/admin/edit/[id]`)
- Click **Edit** on any row in `/admin` to modify titles, links, audio previews, or formatting.
- Click **Delete** to instantly remove an entry and its associated comments from the portal.

---

## 🔗 Official Social & Streaming Links

| Platform | Official URL / Handle | Description |
| :--- | :--- | :--- |
| **Spotify** | [`open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi`](https://open.spotify.com/user/31agnyw5dny56c3pgdtl7p4pzioi) | Official Spotify artist profile & discography. |
| **TikTok** | [`tiktok.com/@snacky206`](https://www.tiktok.com/@snacky206?_r=1&_t=ZG-99Cq8fPPWSn) | `@snacky206` — Behind the scenes, acoustic snippets & reels. |
| **Instagram** | [`instagram.com/snacky_officially`](https://instagram.com/snacky_officially) | `@snacky_officially` — Aesthetic photo journal & concert stories. |
| **YouTube** | [`youtube.com/@snacky_officially`](https://youtube.com/@snacky_officially) | `@snacky_officially` — Official music videos & live sessions. |

---

## 💻 Tech Stack & Development Notes

- **Framework:** Next.js 16 (App Router with Turbopack).
- **Language:** TypeScript 5.
- **Styling:** Tailwind CSS v4 with custom scrapbook aesthetic tokens (warm cream paper, washi tape, and vintage typography).
- **Animations:** Framer Motion & Canvas Confetti.
- **Database & ORM:** Prisma ORM with SQLite (Local) / Cloud DB (Production).
- **Security & Auth:** Jose JWT with HTTP-only secure session cookies and Bcrypt password hashing.
- **Resilience:** Built-in Zero-Crash Fallback Dataset ([`src/lib/fallbackData.ts`](./src/lib/fallbackData.ts)) ensuring 100% uptime on serverless hosting.

---
*© 2026 Snacky Official. All rights reserved.*
