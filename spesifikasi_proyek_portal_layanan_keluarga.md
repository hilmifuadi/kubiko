**Project Specification & Progress Log: Family Services Portal & Personal Dashboard (kubiko.my.id)**  
Dokumen ini berisi spesifikasi teknis, arsitektur jaringan, catatan pemecahan masalah (*troubleshooting*), serta rangkuman implementasi proyek portal web statis untuk keluarga di domain **`kubiko.my.id`**.

---

## 1. Gambaran Umum & Tujuan Proyek
- **Domain:** `kubiko.my.id`
- **Repositori GitHub:** [https://github.com/muhaliakbar14-cyber/kubiko](https://github.com/muhaliakbar14-cyber/kubiko) (Branch: `main`)
- **Jenis Proyek:** Static Web Portal & Service Directory (portal mandiri keluarga).
- **Target Pengguna:** Seluruh anggota keluarga (akses mudah tanpa perlu tahu nomor port) dan publik.
- **Karakteristik Utama:** Super ringan (zero backend runtime di VPS, konsumsi RAM < 15MB), tampilan ramah keluarga, bersih, dan cepat.

---

## 2. Arsitektur Infrastruktur & Jaringan

Sistem menggunakan pola **Edge Reverse Proxy over Mesh VPN** untuk menembus CGNAT *Home Server* secara aman tanpa *port forwarding* di router rumah.

```text
[Browser Pengunjung / Keluarga]
        │ (HTTPS Let's Encrypt)
        ▼
 [VPS Publik: 160.19.166.23] ── Web Server: Caddy v2
        ├── kubiko.my.id ──────────► Static Build Astro (/var/www/kubiko/dist)
        ├── nonton.kubiko.my.id ───► Reverse Proxy via Tailscale ──► [Home Server:8096 (Jellyfin)]
        ├── files.kubiko.my.id ────► Reverse Proxy via Tailscale ──► [Home Server:8443 (Nextcloud)]
        ├── pdf.kubiko.my.id ──────► Reverse Proxy via Tailscale ──► [Home Server:8889 (Stirling PDF)]
        └── status.kubiko.my.id ───► Reverse Proxy via Tailscale ──► [Home Server:3001 (Uptime Kuma)]
```

### Rincian Node Jaringan:
1. **Edge Server (Cloud VPS):**
   - **IP Publik:** `160.19.166.23`
   - **Tailscale IP:** `100.107.50.76` (di bawah `tag:vps`)
   - **Peran:** Menyajikan file statis portal web (`dist/`) dan *Reverse Proxy* SSL otomatis via Caddy v2.
2. **Home Server (`dell`):**
   - **Hostname:** `dell`
   - **Tailscale IP:** `100.96.87.92` (di bawah user `muhaliakbar14-cyber@`)
   - **Firewall (UFW):** `inactive`
   - **Docker Compose:** Berada di `/home/bolay/jellyfin/docker-compose.yml`

---

## 3. Tech Stack Frontend
- **Framework:** **Astro v5 (SSG)** — Output akhir berupa HTML, CSS, dan sedikit Vanilla JS murni.
- **Styling:** **Tailwind CSS**.
- **Icons:** **Lucide Icons** (`lucide-astro`).
- **Data Management:** Terpusat di `src/data/services.ts` (menambah/mengubah layanan cukup di file ini).
- **Uptime Kuma Integration:** Script client-side cerdas dengan *keyword auto-matching* dan graceful fallback ke `public/mock-status.json`.

---

## 4. Panduan Desain & Estetika (Warm Light Theme)
- **Background Utama:** Warm Cream / Off-White (`#FAF9F6`).
- **Surface / Card Background:** Pure White (`#FFFFFF`) & Soft Sand (`#F2EFE9`).
- **Border & Garis Pemisah:** Warm Stone (`#E6E2D8`), hover border (`#D1CCC0`).
- **Teks Utama:** Deep Charcoal (`#1C1B18`).
- **Teks Sekunder:** Muted Slate / Warm Gray (`#6E6A61`).
- **Aksen:** Sage Green (`#3D6B58`), Status Hijau (`#10B981`), Status Merah (`#EF4444`).
- **Tipografi:** `Plus Jakarta Sans` (Heading & Body) dan `JetBrains Mono` (Info teknis/monospace).

---

## 5. Daftar Layanan & Port Mapping Riil (Home Server)

| Layanan | Subdomain Publik | Target Port di Home Server | Status Terkini |
| :--- | :--- | :--- | :--- |
| **Portal Utama** | `kubiko.my.id` | `/var/www/kubiko/dist` (Lokal VPS) | Siap deploy dari folder `dist/` |
| **Jellyfin Media** | `nonton.kubiko.my.id` | `100.96.87.92:8096` | ✅ **AKTIF & NORMAL (302 OK)** |
| **Stirling PDF** | `pdf.kubiko.my.id` | `100.96.87.92:8889` | ✅ **AKTIF & NORMAL (200 OK)** |
| **Uptime Kuma** | `status.kubiko.my.id` | `100.96.87.92:3001` | ✅ **AKTIF & NORMAL (302 OK)** |
| **Nextcloud** | `files.kubiko.my.id` | `100.96.87.92:8443` | ⚠️ Menunggu penyesuaian versi |
| **Minecraft Server** | `crafty.kubiko.my.id` | `crafty.kubiko.my.id` (Alamat Host) | Tombol salin host tersedia di kartu |
| **Zona Game** | `game.kubiko.my.id` | `100.96.87.92:3002` | Subdomain disiapkan (Upcoming) |

---

## 6. Konfigurasi Caddyfile di VPS (`/etc/caddy/Caddyfile`)

```caddy
# 1. Main Portal (Static Astro SSG) + Status API Proxy
kubiko.my.id, www.kubiko.my.id {
    encode gzip zstd

    handle /api/status-page/* {
        reverse_proxy 100.96.87.92:3001
    }

    handle {
        root * /var/www/kubiko/dist
        try_files {path} /index.html
        file_server
    }
}

# 2. Jellyfin Media Server
nonton.kubiko.my.id {
    encode gzip zstd
    reverse_proxy 100.96.87.92:8096
}

# 3. Nextcloud Storage
files.kubiko.my.id {
    encode gzip zstd
    reverse_proxy 100.96.87.92:8443
}

# 4. Stirling PDF Tools
pdf.kubiko.my.id {
    encode gzip zstd
    reverse_proxy 100.96.87.92:8889
}

# 5. Uptime Kuma Status Page
status.kubiko.my.id {
    encode gzip zstd
    reverse_proxy 100.96.87.92:3001
}
```

---

## 7. Rangkuman Troubleshooting & Solusi yang Berhasil Diterapkan

### A. Masalah Cloudflare DNS & SSL
- **Gejala:** Subdomain tidak bisa dibuka (`DNS_PROBE_POSSIBLE`), wildcard mengarah ke IP Tailscale.
- **Solusi:**
  - Tambahkan A record untuk `@`, `nonton`, `status`, `pdf`, `files` ke IP publik VPS (`160.19.166.23`) dengan status *DNS only*.
  - Tambahkan CNAME `www` mengarah ke `kubiko.my.id`.
  - Hapus IP Tailscale dari DNS publik Cloudflare.

### B. Masalah Error 502 di Semua Subdomain (Tailscale ACL)
- **Gejala:** `tailscale ping` tembus 4ms, tetapi semua koneksi HTTP/TCP ke port 3001, 8096, dll. selalu timeout / 502.
- **Penyebab:** VPS menggunakan `tag:vps`, dan Tailscale ACL default memblokir perangkat bertag untuk memulai koneksi ke perangkat user (`dell`).
- **Solusi:** Perbarui Tailscale ACL di Admin Console (`login.tailscale.com/admin/acls`) dengan menambahkan port ke dalam `grants`:
  ```json
  {
      "src": ["tag:vps"],
      "dst": ["100.96.87.92"],
      "ip": ["tcp:8096", "tcp:8443", "tcp:8889", "tcp:3001"]
  }
  ```
  *Hasil:* Begitu di-save, `status.kubiko.my.id`, `nonton.kubiko.my.id`, dan `pdf.kubiko.my.id` langsung aktif seketika!

### C. Masalah Port Stirling PDF
- **Penyebab:** Stirling PDF di Home Server di-mapping ke port `8889` (bukan 8080 karena 8080 dipakai qbittorrent via gluetun).
- **Solusi:** Caddyfile diubah mengarah ke `100.96.87.92:8889`. Hasilnya langsung 200 OK.

### D. Masalah Nextcloud (Error 502 & Crash Loop)
- **Penyebab dari Log:**
  `Can't start Nextcloud because upgrading from 33.0.0.16 to 35.0.3.2 is not supported. It is only possible to upgrade one major version at a time.`
  Image `nextcloud:latest` menarik versi 35, sedangkan data lama berada di versi 33.
- **Solusi:**
  - Opsi Cepat: Pin image ke `image: nextcloud:33` di `docker-compose.yml`, lalu `docker compose up -d nextcloud`.
  - Opsi Bertahap: Naikkan perlahan: 33 ➔ 34 ➔ 35.
  - Tambahkan environment HTTPS:
    ```yaml
    - OVERWRITEPROTOCOL=https
    - OVERWRITECLIURL=https://files.kubiko.my.id
    ```

### E. Penyesuaian UI & Kebutuhan Pengguna
- **Uptime Kuma Card:** Dihapus dari katalog layanan publik (hanya memantau di background & navbar).
- **Penyederhanaan Teks:** Menghilangkan angka teknis latensi/SLA dan istilah rumit dari kartu layanan agar ramah untuk anggota keluarga.
- **Penghapusan Tulisan "Singapore":** Diganti dengan "Cloud VPS".
- **Pemisahan Penjelasan Teknis:** Penjelasan arsitektur hanya ditempatkan di section Arsitektur Jaringan.

---

## 8. Langkah Lanjutan untuk Sesi / Conversation Berikutnya

1. **Deploy Build Statis ke VPS:**
   Salin isi folder `dist/` dari proyek ini ke VPS di direktori `/var/www/kubiko/dist`.
   *(Bisa menggunakan rsync, scp, atau git pull + build di VPS).*
2. **Finishing Nextcloud:**
   Jalankan `docker compose up -d nextcloud` setelah mengubah image ke `nextcloud:33` (atau setelah migrasi v34/v35 selesai), lalu pastikan `files.kubiko.my.id` dapat dibuka.
3. **Penyelarasan Game Server (Crafty/Minecraft):**
   Konfigurasikan subdomain game atau uji tombol salin host `crafty.kubiko.my.id`.
