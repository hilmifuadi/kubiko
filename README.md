# Kubiko Portal (`kubiko.my.id`)

Portal Layanan Keluarga & Dashboard Mandiri super ringan berbasis **Astro (SSG)**, **Tailwind CSS**, dan **TypeScript**. Menyediakan antarmuka terpusat yang ramah dan nyaman bagi seluruh anggota keluarga untuk mengakses berbagai utilitas digital sehari-hari.

---

## 🌟 Fitur Utama

- **Super Ringan & Cepat (Zero Backend Runtime)**: Menghasilkan output web statis murni (`dist/`) yang sangat hemat sumber daya, cepat dimuat, dan aman.
- **Warm Light Aesthetic**: Tampilan bernuansa hangat, bersih, dan nyaman di mata seluruh anggota keluarga dengan tipografi modern (*Plus Jakarta Sans*).
- **Katalog Layanan Keluarga**:
  - 🎬 **Nonton Film & Video**: Akses ke koleksi hiburan tontonan keluarga.
  - 🎟️ **Permintaan Film & Serial**: Ajukan judul baru lewat Seerr dan pantau sampai siap ditonton.
  - 📂 **Penyimpanan Berkas**: Tempat aman mencadangkan foto liburan dan dokumen keluarga.
  - 📄 **Pengolah PDF**: Utilitas praktis untuk menggabungkan, memisahkan, dan mengompres berkas PDF.
  - 🎮 **Server Game**: Akses game bersama untuk keluarga dan teman.
- **Status Layanan Real-Time**: Integrasi pemantauan status cerdas (Uptime Kuma) dengan indikator visual ketersediaan layanan dan fallback otomatis.
- **Responsif Multi-Perangkat**: Desain ramah pengguna yang mudah digunakan di smartphone, tablet, laptop, hingga Smart TV.
- **Salin Alamat Cepat**: Tombol praktis untuk menyalin alamat web layanan dengan umpan balik visual instan.

---

## 📁 Struktur Direktori

```text
kubiko/
├── public/
│   ├── favicon.svg             # Ikon logo Kubiko
│   └── mock-status.json        # Fallback data status layanan
├── src/
│   ├── components/
│   │   ├── Navbar.astro        # Header & indikator status global
│   │   ├── HeroStatusCard.astro# Kartu ringkasan status layanan
│   │   ├── CategoryFilter.astro# Filter kategori layanan
│   │   ├── ServiceCard.astro   # Kartu fitur layanan utama
│   │   ├── AccessGuide.astro   # Panduan penggunaan & daftar tautan
│   │   ├── Toast.astro         # Notifikasi toast salin alamat
│   │   └── Footer.astro        # Footer portal
│   ├── data/
│   │   └── services.ts         # Sumber data terpusat konfigurasi & layanan
│   ├── layouts/
│   │   └── Layout.astro        # Layout dasar & skrip pemantau status
│   ├── pages/
│   │   └── index.astro         # Halaman utama portal
│   ├── styles/
│   │   └── global.css          # Styling Tailwind & tema warm light
│   └── types/
│       └── service.ts          # Definisi tipe TypeScript
├── astro.config.mjs            # Konfigurasi Astro
├── tailwind.config.mjs         # Konfigurasi Tailwind palet warm light
└── package.json
```

---

## 🚀 Memulai Proyek Secara Lokal

Pastikan Anda telah memasang **Node.js** (minimal versi 22.23.4):

1. **Pasang Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:4321`.

3. **Membangun untuk Produksi (Static SSG):**
   ```bash
   npm run build
   ```
   File statis hasil kompilasi akan berada di direktori `dist/`.

4. **Pratinjau Hasil Build:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Pengaturan & Kustomisasi Layanan

Semua data layanan, tautan, ikon, dan kategori dikelola secara terpusat pada file:
```text
src/data/services.ts
```
Untuk menambah atau mengubah layanan, cukup sesuaikan objek data pada berkas tersebut tanpa perlu mengubah struktur komponen.
