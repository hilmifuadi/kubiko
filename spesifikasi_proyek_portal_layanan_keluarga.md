**Project Specification: Family Services Portal & Personal Dashboard**  
Dokumen ini berisi spesifikasi teknis, desain UI/UX, serta arsitektur jaringan untuk membangun portal web statis sebagai dashboard layanan keluarga (Jellyfin, Stirling PDF, Game Server, dll.) dan portofolio pribadi.  
  
---  
**1. Gambaran Umum & Tujuan Proyek**  
- **Jenis Proyek:** Static Web Portal & Service Directory (bukan toko/penyedia layanan komersial).  
- **Target Pengguna:** Anggota keluarga (akses cepat layanan rumah) dan pengunjung publik (informasi status/portofolio).  
- **Karakteristik Utama:** Super ringan (zero backend runtime di VPS), tampilan bersih terinspirasi dari layout modern *Bento Grid* \& *technical aesthetic* ala Cloudzy, namun menggunakan palet warna terang yang kalem (*warm light theme*).  
  
---  
**2. Arsitektur Infrastruktur & Jaringan**  
Sistem menggunakan pola **Edge Reverse Proxy over Mesh VPN** untuk menembus CGNAT *home server* dengan penggunaan resource VPS yang minimal.  
- **Edge Server (VPS Publik):**  
  - Spesifikasi: 1 vCPU, 1 GB RAM.  
  - Peran: Menyajikan file statis web portal dan bertindak sebagai *Reverse Proxy* publik dengan SSL otomatis.  
  - Web Server: **Caddy** (direkomendasikan karena ringan dan otomatis mengelola sertifikat HTTPS Let's Encrypt).  
- **Tunneling: Tailscale (Tailnet)** menghubungkan VPS publik dengan *Home Server* secara aman tanpa *port forwarding* di router rumah.  
- **Home Server (Di Belakang CGNAT):**  
  - Menjalankan aplikasi inti: **Jellyfin**, **Stirling PDF**, **Game Server**, dan **Uptime Kuma** (sebagai pemantau status layanan).  
```  
[Browser Pengguna]  
        │ (HTTPS)  
        ▼  
 [VPS Publik: 1 vCPU / 1 GB RAM] ── Caddy Web Server  
        ├── domain.com ──────────► Static Build Astro (/var/www/portal)  
        ├── jellyfin.domain.com ─► Reverse Proxy via Tailscale IP ──► [Home Server:8096]  
        ├── pdf.domain.com ──────► Reverse Proxy via Tailscale IP ──► [Home Server:8080]  
        └── status.domain.com ───► Reverse Proxy via Tailscale IP ──► [Home Server:3001 (Uptime Kuma)]  
   
```  
  
---  
**3. Tech Stack Frontend**  
- **Framework: Astro** (Static Site Generation / SSG). Output akhir berupa file HTML, CSS, dan sedikit Vanilla JS murni sehingga tidak membebani RAM VPS.  
- **Styling: Tailwind CSS** (v3 atau v4).  
- **Icons: Lucide Icons** (`lucide-astro` atau inline SVG) untuk ikon layanan yang minimalis dan tajam.  
- **Data Management:** Menggunakan file konfigurasi lokal terpusat (misalnya `src/data/services.ts` atau `services.json`) agar penambahan/pengeditan layanan cukup mengubah data tanpa menyentuh struktur komponen.  
- **Monitoring Integration:** Fetch client-side ringan ke API Status Page **Uptime Kuma** yang di-host di *home server* (di-proxy lewat Caddy agar tidak terkena blokir CORS/CGNAT).  
  
---  
**4. Panduan Desain & Estetika (Warm Light Technical Theme)**  
Mengadaptasi struktur tata letak Cloudzy (rapi, terstruktur, *bento grid*, dan memiliki kartu informasi ala *terminal/status card*), tetapi diubah menjadi **tema terang yang kalem dan ramah mata**:  
**Palet Warna**  
- **Background Utama:** Warm Cream / Off-White (`#FAF9F6` atau `#F7F5F0`).  
- **Surface / Card Background:** Pure White (`#FFFFFF`) atau Soft Sand (`#F2EFE9`) untuk kontras lembut.  
- **Border & Garis Pemisah:** Warm Stone / Light Taupe (`#E6E2D8`) dengan efek hover border sedikit lebih gelap (`#D1CCC0`) atau aksen lembut.  
- **Teks Utama:** Deep Charcoal (`#1C1B18`) — lebih lembut dari hitam pekat.  
- **Teks Sekunder:** Muted Slate / Warm Gray (`#6E6A61`).  
- **Warna Aksen:**  
  - Primary Accent: Sage Green (`#3D6B58`) atau Terracotta/Amber kalem (`#C86D51`) untuk tombol utama dan highlight.  
  - Status Online: Emerald Green (`#10B981`) dengan animasi denyut (*pulse*) halus.  
  - Status Offline: Rose Red (`#EF4444`).  
**Tipografi**  
- **Heading & Body:** `Plus Jakarta Sans` atau `Inter` (bersih, modern, mudah dibaca).  
- **Monospace (Badge, IP, Status Teknis):** `JetBrains Mono` atau `Fira Code` (memberikan sentuhan teknis khas halaman produk infrastruktur).  
**Fitur yang Dihilangkan (Out of Scope)**  
- **Tidak perlu** fitur *Command Palette* (`⌘K` search modal).  
- **Tidak perlu** sistem login/autentikasi di halaman portal (autentikasi ditangani masing-masing layanan seperti Jellyfin).  
- **Tidak perlu** sistem keranjang belanja, harga, atau backend database di VPS.  
  
---  
**5. Struktur Halaman & Komponen Utama**  
1. **Header / Navigation Bar (Minimalis):**  
  - **Kiri:** Logo/Nama Portal (misal: `RUMAH.NET` atau nama keluarga) + *Badge* status global (`● Semua Layanan Normal` yang terhubung ke Uptime Kuma).  
  - **Kanan:** Navigasi sederhana (misal: `Layanan`, `Mini Games`, `Tentang / Portofolio`).  
2. **Hero Section (2 Kolom Asimetris):**  
  - **Kolom Kiri:** Judul ramah & jelas (misal: *"Pusat Hiburan & Utilitas Keluarga"*), subjudul singkat penjelasan portal, dan tombol akses cepat (*Quick Action*) ke 2 layanan paling sering dibuka (Jellyfin & Stirling PDF).  
  - **Kolom Kanan (Info / Status Card ala Cloudzy):** Kartu bergaya *system window* terang (`#F2EFE9` dengan 3 titik dekoratif di pojok kiri atas) yang menampilkan informasi ringkas jaringan:  
    - `Edge Node`: VPS Singapore (Online)  
    - `Tunnel`: Tailscale Mesh Active  
    - `Home Node`: Connected  
3. **Service Bento Grid (Inti Halaman):**  
  - Filter kategori sederhana berbasis tombol/tab (`Semua`, `Media`, `Utilitas`, `Game`).  
  - Kartu layanan disusun dalam grid responsif (1 kolom di HP, 2-3 kolom di desktop).  
  - **Isi setiap kartu layanan:**  
    - Ikon layanan + Indikator titik status *real-time* (Hijau/Merah dari Uptime Kuma).  
    - Nama Layanan (contoh: **Jellyfin**, **Stirling PDF**, **Minecraft Server**, **Web Mini Games**).  
    - Deskripsi singkat 1-2 baris yang mudah dipahami anggota keluarga.  
    - Tag spesifikasi/info kecil dengan font *monospace* (contoh: `4K HDR • Streaming`, `PDF Tools • No Upload Limit`, atau tombol `Copy IP` khusus untuk game server).  
    - Tautan/Tombol membuka layanan di tab baru.  
4. **Footer Minimalis:**  
  - Informasi hak cipta pribadi, tautan ke portofolio/GitHub pribadi, dan tautan langsung ke halaman penuh **Uptime Kuma Status Page**.  
  
---  
**6. Instruksi Build & Deployment untuk AI Agent**  
Saat membangun proyek ini, ikuti aturan berikut:  
1. Inisialisasi proyek **Astro** dengan **Tailwind CSS** dan **TypeScript**.  
2. Pisahkan daftar layanan ke dalam file data terstruktur (`src/data/services.ts`) dengan skema: `id`, `name`, `description`, `url`, `category`, `icon`, `tag`, `uptimeKumaMonitorId`, dan opsi `copyText` (opsional untuk IP game).  
3. Buat komponen UI modular (`Navbar.astro`, `HeroStatusCard.astro`, `ServiceCard.astro`, `Footer.astro`).  
4. Implementasikan skrip *client-side* ringan (Vanilla JS) di dalam Astro untuk:  
  - Filter kategori layanan secara instan tanpa reload.  
  - Fitur *Click-to-Copy* (untuk IP server game) dengan notifikasi *toast* kecil.  
  - Fetch status monitor dari endpoint publik Uptime Kuma (`/api/status-page/heartbeat/<slug>`) untuk memperbarui titik indikator status tiap kartu secara dinamis (dengan *fallback* elegan jika API tidak terjangkau saat mode *development* lokal).  
5. Pastikan hasil akhir dapat di-build menjadi file statis murni menggunakan perintah `npm run build` (menghasilkan folder `dist/`).  
