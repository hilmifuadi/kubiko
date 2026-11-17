# Kubiko Portal (`kubiko.my.id`)

Portal Layanan Keluarga & Dashboard Pribadi super ringan berbasis **Astro (SSG)**, **Tailwind CSS**, dan **TypeScript**. Dibangun dengan estetika *Warm Light Technical Theme* (terinspirasi Bento Grid & Cloudzy status telemetry).

---

## 🌟 Fitur Utama

- **Zero Runtime di VPS**: Hasil build berupa HTML/CSS/JS statis murni (`dist/`), sangat hemat RAM (<15MB di VPS 1 vCPU / 1GB RAM).
- **Warm Light Aesthetic**: Palet warna nyaman di mata (Warm Cream `#FAF9F6`, Soft Sand `#F2EFE9`, Sage Green `#3D6B58`, Emerald `#10B981`).
- **Edge Reverse Proxy over Tailscale Mesh**: Menghubungkan VPS publik ke Home Server di balik CGNAT tanpa membuka port router rumah.
- **Bento Grid Layanan**: Kartu layanan tersusun rapi dengan indikator status real-time, monospace tags, dan kategori (Media, Utilitas, Game).
- **Client-Side Interactivity (Vanilla JS)**:
  - Filter kategori instan tanpa reload halaman.
  - Fitur Click-to-Copy (untuk IP server game Minecraft) dengan toast notification.
  - Integrasi live status Uptime Kuma dengan graceful fallback (`mock-status.json`).
- **Hero Telemetry Card**: Status window ala Cloudzy menampilkan status Edge Node, Tailscale Tunnel, dan Home Node.

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
│   │   ├── HeroStatusCard.astro# Telemetry status ala Cloudzy
│   │   ├── CategoryFilter.astro# Filter kategori tab (Semua, Media, Utilitas, Game)
│   │   ├── ServiceCard.astro   # Bento card untuk tiap layanan
│   │   ├── Toast.astro         # Notifikasi toast salin IP
│   │   └── Footer.astro        # Footer & link status page
│   ├── data/
│   │   └── services.ts         # Sumber data terpusat semua layanan & konfigurasi
│   ├── layouts/
│   │   └── Layout.astro        # Base layout HTML, meta tags, & client scripts
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

2. **Build untuk Produksi (Static SSG):**
   ```bash
   npm run build
   ```
   Output statis akan berada di direktori `dist/`.

3. **Preview Hasil Build:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Menambah / Mengubah Layanan

Untuk menambah atau mengubah daftar layanan, cukup edit berkas `src/data/services.ts`.

Contoh entitas layanan:
```typescript
{
  id: 'jellyfin',
  name: 'Jellyfin Media',
  description: 'Streaming film, serial TV, dan musik keluarga kualitas tinggi tanpa jeda iklan.',
  url: 'https://jellyfin.kubiko.my.id',
  category: 'media',
  icon: 'Film',
  tag: '4K HDR • Streaming',
  uptimeKumaMonitorId: 1,
  isQuickAction: true
}
```

---

## 🌐 Panduan Deployment di VPS (Caddy)

1. Build proyek secara lokal atau di VPS:
   ```bash
   npm run build
   ```
2. Salin isi folder `dist/` ke VPS Anda, misalnya ke `/var/www/kubiko/dist`.
3. Gunakan panduan pada berkas `Caddyfile.example` untuk mengonfigurasi Caddy Web Server dengan Tailscale IP Home Server Anda.
4. Reload Caddy:
   ```bash
   sudo systemctl reload caddy
   ```
