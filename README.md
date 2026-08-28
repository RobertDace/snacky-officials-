# 🌸 Snacky Official Music & Scrapbook Portal

An authentic, indie-aesthetic music portal and fan community website for Berlin-based Ukrainian indie acoustic & bossa nova singer-songwriter **Snacky**.

![Snacky Cover Art](/public/snacky-cover.jpg)

---

## 🌟 Key Features

- 🎨 **Authentic Scrapbook Aesthetic:** Hand-drawn floral and bunny doodles, textured kraft cards, washi tape, and tactile typography.
- 🎵 **Interactive Audio Player:** Persistent floating music widget to listen to acoustic previews seamlessly while browsing.
- 📱 **Official Brand Integrations:** Official SVG vectors and direct links to **Spotify**, **TikTok** (`@snacky206`), **Instagram**, and **YouTube**.
- 📖 **Artist Bio & Story:** Comprehensive background on Snacky's acoustic guitar journey, Ukrainian roots, and bossa nova influences.
- 💿 **Discography & Releases:** Categorized releases (Singles, Albums, Concert Tours, News) with live search and filtering.
- 💬 **Fan Club Community:** User authentication (Register/Login) with interactive comment sections and celebration confetti.
- 👑 **Admin Management CMS:** Secure administrative dashboard (`/admin`) for publishing, editing, and managing music entries, drafts, and tour dates.
- 🛡️ **Zero-Crash Serverless Resilience:** Built-in fallback data layer guaranteeing 100% uptime on Vercel or any cloud hosting.

---

## 📖 Documentation & User Guide

For detailed step-by-step instructions on navigating the website as a fan or managing content as an administrator, please refer to the complete English guide:

👉 **[Read the Full User Guide (HOW_TO_USE.md)](./HOW_TO_USE.md)**

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Motion:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Jose JWT](https://github.com/panva/jose) & [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Icons & Effects:** [Lucide React](https://lucide.dev/), [Canvas Confetti](https://github.com/catdad/canvas-confetti)

---

## 🚀 Quick Start (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RobertDace/snacky-officials-.git
   cd snacky-officials-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Configure Environment Variables in Vercel Project Settings:
   - `DATABASE_URL`: `file:./dev.db` (or your remote Postgres / Turso DB URL)
   - `JWT_SECRET`: `snacky_super_secret_jwt_key_2026_jazz_bossa_nova_production_ready`
   - `NEXT_PUBLIC_APP_URL`: `https://your-vercel-domain.vercel.app`
   - `NODE_ENV`: `production`
4. Click **Deploy**.

---

*© 2026 Snacky Official. All rights reserved.*
