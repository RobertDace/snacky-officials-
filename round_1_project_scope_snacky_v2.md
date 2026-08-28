# Round 1: Fondasi & Scope Frontier — Snacky Official Website & Portal (v2 - Multi-Page Revision)

Dokumen ini merupakan pembaruan spesifikasi teknis dan desain berdasarkan masukan langsung dari klien. Menekankan arsitektur multi-halaman terpisah (bukan single-page scrolling), batasan ketat terhadap branding nama asli, dan hierarki navigasi yang ringkas.

---

## 1. Identitas & Persona Musisi (Brand & Vibe)

* **Nama Panggung Utama:** **Snacky** (Fokus branding 100% pada nama ini).
* **Kebijakan Nama Asli (Strict Rule):**
  * Nama asli (*Kira Lynnyk*) **tidak boleh** ditampilkan di judul, header, isi teks bio, atau konten utama halaman.
  * Nama asli **hanya boleh muncul satu kali** di bagian paling bawah website (Global Footer / copyright note, misal: `© 2026 Snacky. All rights reserved · Kira Lynnyk`).
* **Domisili & Bahasa:** Berbasis di Jerman, membawakan & menulis lagu dalam Bahasa Inggris.
* **Genre Musik:** Fusi **Jazz & Bossa Nova** dengan sentuhan **Indie Pop & Pop** (karya orisinal & cover).
* **Aura Visual & Palet Warna:**
  * *Theme:* Cozy, dreamy, whimsical, indie-cute scrapbook / collage-core aesthetic (doodle pita, kelinci, bunga, tipografi kolase).
  * *Palette:*
    * *Soft Butter Yellow* (`#FFF9D2`) & *Baby Blue* (`#A3CEF1`)
    * *Muted Sage Green* (`#9CAF88`) & *Soft Pastel Pink / Lilac* (`#F3B0C3` / `#E8A598`)

---

## 2. Platform & Format Arsitektur (Multi-Page Structure)

* **Format:** **Full-Stack Web Application (Multi-Page Dedicated Routes)**.
* **Kebijakan Navigasi (Bukan Single-Page Scroll):**
  * Website **wajib dibagi menjadi 3 halaman/rute mandiri** untuk menjaga atensi pengunjung dan kemudahan navigasi instan:
    1. **Page 1 — Social Hub (`/`):** Khusus kanal media sosial & streaming.
    2. **Page 2 — Artist Bio (`/bio`):** Khusus foto utama dan biografi resmi.
    3. **Page 3 — Releases & News (`/news` atau `/releases`):** Khusus rilis lagu, album, konser, dan kolom komentar.
* **Arsitektur Pengguna (Role-Based Access Control / RBAC):**
  1. **Admin (Snacky):**
     * Akses Dashboard CMS untuk membuat, mengedit, dan menghapus postingan rilis/berita/konser serta menghapus/memoderasi komentar.
  2. **Authenticated Fan / User:**
     * Registrasi & login akun penggemar.
     * Hak akses: Menulis komentar di postingan rilis/berita.
     * Larangan: **Tidak memiliki akses** ke CMS/admin panel dan tidak dapat membuat postingan baru.
  3. **Guest / Public:**
     * Menjelajahi ketiga halaman publik tanpa izin komentar sebelum login.

---

## 3. Tujuan Utama & Call to Action (Conversion Goal)

1. **Direct Platform Redirection:** Mempermudah pengunjung langsung menuju Spotify, YouTube, TikTok, dan Instagram tanpa terdistraksi konten lain.
2. **Dedicated News & Concert Hub:** Menyajikan jadwal konser dan rilis lagu terbaru secara ringkas tanpa scrolling panjang.
3. **Focused Fan Engagement:** Membangun interaksi terpusat melalui sistem komentar di halaman rilis.

---

## 4. Rincian Halaman & Fitur Utama (Scope MVP)

### Rute Halaman Mandiri:
* **Halaman 1 — Home / Social Media (`/`):**
  * Tampilan ringkas, to-the-point, dan bersih.
  * Tautan interaktif bergaya visual aesthetic ke:
    * Instagram (`@snacky_officially`)
    * TikTok (`@snacky206` — `https://www.tiktok.com/@snacky206?_r=1&_t=ZG-99Cq8fPPWSn`)
    * YouTube (`@snacky_officially`)
    * Spotify (Profil Artis)
* **Halaman 2 — Artist Bio (`/bio`):**
  * Penempatan foto kolase Snacky bergitar di padang rumput di bagian paling atas.
  * Teks biografi resmi (fokus pada perjalanan musik jazz/bossa nova/indie pop dan ucapan terima kasih kepada penggemar).
  * Bebas dari penyebutan nama asli dalam paragraf bio.
* **Halaman 3 — Releases & News (`/news`):**
  * Feed dinamis yang menampilkan single baru, album, pengumuman konser, dan update proyek musik.
  * Kolom komentar di setiap entri postingan (khusus pengguna yang telah login).
* **Global Footer (Muncul di semua halaman):**
  * Navigasi ringkas antar 3 halaman.
  * Satu-satunya tempat pencantuman nama asli: `© Snacky · Kira Lynnyk`.

### Modul CMS & Autentikasi:
* **Autentikasi Pengguna:** Sistem registrasi & login mandiri untuk fans.
* **Panel Admin:** Dashboard proteksi rute bagi Snacky untuk manajemen CRUD rilis & moderasi komentar.

---

## 5. Ketersediaan Aset & Referensi

* **Aset Siap Pakai:**
  * Foto profil bergaya scrapbook (Snacky di padang rumput).
  * Teks biografi resmi bahasa Inggris (sudah difilter dari nama asli di body text).
  * Link profil lengkap (IG, TikTok, YT, Spotify).
  * Referensi palet warna pastel & typography tone.
* **Placeholder/Dummy:**
  * Sample jadwal konser dan rilis album untuk populasi awal database.