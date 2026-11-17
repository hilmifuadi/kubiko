# Kubiko Portal (`kubiko.my.id`)

Portal Layanan Keluarga & Dashboard Pribadi super ringan berbasis **Astro (SSG)**, **Tailwind CSS**, dan **TypeScript**. Menggabungkan performa murni static site dengan fitur cerdas telemetri **Uptime Kuma** dan direktori subdomain *Edge Reverse Proxy via Tailscale Mesh*.

---

## 🌟 Fitur Utama

- **Zero Runtime di VPS**: Output berupa HTML statis murni (`dist/`), RAM VPS <15MB di VPS 1 vCPU / 1GB RAM.
- **Warm Light Technical Aesthetic**: Tampilan ramah mata dan mudah dibaca seluruh keluarga (*Plus Jakarta Sans* & *JetBrains Mono*).
- **Direct Subdomain Routing**:
  - `nonton.kubiko.my.id` ➔ Jellyfin Media Server (`:8096`)
  - `files.kubiko.my.id` ➔ Nextcloud Drive (`:8081`)
  - `pdf.kubiko.my.id` ➔ Stirling PDF Tools (`:8080`)
  - `crafty.kubiko.my.id` ➔ Crafty Minecraft Controller (`:8443`)
  - `game.kubiko.my.id` ➔ Zona Game Keluarga (`:3002`)
  - `status.kubiko.my.id` ➔ Uptime Kuma 24/7 Monitor (`:3001`)
- **Smart Uptime Kuma Integration**:
  - Auto-matching status monitor berdasarkan keyword nama (`nonton`, `files`, `pdf`, `crafty`, dll.).
  - Indikator latensi ping (*ms*) dan uptime SLA 24 jam (*%*).
  - Tombol manual **"Segarkan"** (*Refresh*) dan polling berkala setiap 60 detik.
  - Fallback lokal otomatis (`mock-status.json`) jika API sedang offline.
- **Panduan Akses Keluarga**: Langkah mudah untuk keluarga saat login dan tabel rute subdomain dengan tombol sekali klik untuk menyalin alamat.

---

## 📁 Struktur Direktori

```text
kubiko/
├── public/
│   ├── favicon.svg             # Logo Kubiko
│   └── mock-status.json        # Fallback data status Uptime Kuma
├── src/
│   ├── components/
│   │   ├── Navbar.astro        # Header & global status pill
│   │   ├── HeroStatusCard.astro# Telemetry status ala Cloudzy dengan tombol refresh
│   │   ├── CategoryFilter.astro# Filter kategori tab (Semua, Media, Utilitas, Game)
│   │   ├── ServiceCard.astro   # Bento card untuk tiap layanan
│   │   ├── AccessGuide.astro   # Panduan akses 3 langkah & tabel rute Caddy
│   │   ├── Toast.astro         # Notifikasi toast salin alamat
│   │   └── Footer.astro        # Footer & link status page
│   ├── data/
│   │   └── services.ts         # Sumber data terpusat semua layanan & konfigurasi
│   ├── layouts/
│   │   └── Layout.astro        # Base layout HTML, meta tags, & smart Kuma script
│   ├── pages/
│   │   └── index.astro         # Halaman utama portal
│   ├── styles/
│   │   └── global.css          # Tailwind & custom CSS
│   └── types/
│       └── service.ts          # TypeScript interfaces
├── Caddyfile.example           # Contoh konfigurasi Caddy Reverse Proxy
├── astro.config.mjs            # Konfigurasi Astro
├── tailwind.config.mjs         # Konfigurasi Tailwind palet warm light
└── package.json
```

---

## 🚀 Menjalankan Secara Lokal

1. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:4321`.

2. **Membangun untuk Produksi (Static SSG):**
   ```bash
   npm run build
   ```
   Output statis akan berada di direktori `dist/`.

3. **Pratinjau Hasil Build:**
   ```bash
   npm run preview
   ```
