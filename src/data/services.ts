import type { ServiceItem, CaddyRoute } from '../types/service';

export const servicesData: ServiceItem[] = [
  {
    id: 'jellyfin',
    name: 'Jellyfin Media',
    description: 'Bioskop rumah untuk menonton koleksi film, serial animasi anak, dan video keluarga tanpa iklan.',
    url: 'https://nonton.kubiko.my.id',
    subdomain: 'nonton.kubiko.my.id',
    category: 'media',
    icon: 'Film',
    tag: '4K HDR • Streaming',
    specs: ['4K HDR', 'Streaming Keluarga', 'Multi Perangkat'],
    uptimeKumaMonitorId: 1,
    uptimeKumaKeywords: ['jellyfin', 'nonton', 'media'],
    isQuickAction: true,
    featured: true
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud Drive',
    description: 'Penyimpanan cloud pribadi keluarga untuk mencadangkan foto ponsel, dokumen penting, dan berbagi berkas.',
    url: 'https://files.kubiko.my.id',
    subdomain: 'files.kubiko.my.id',
    category: 'utility',
    icon: 'HardDrive',
    tag: 'Private Cloud • Backup',
    specs: ['Cloud Pribadi', 'Cadangan Foto', 'Akses Terpisah'],
    uptimeKumaMonitorId: 2,
    uptimeKumaKeywords: ['nextcloud', 'files', 'cloud'],
    featured: true
  },
  {
    id: 'stirling-pdf',
    name: 'Stirling PDF',
    description: 'Alat praktis untuk menggabungkan, memisah, mengompres, dan mengonversi dokumen PDF tanpa batas unggah.',
    url: 'https://pdf.kubiko.my.id',
    subdomain: 'pdf.kubiko.my.id',
    category: 'utility',
    icon: 'FileText',
    tag: 'PDF Tools • No Upload Limit',
    specs: ['Alat PDF Lengkap', 'Proses Lokal', 'Tanpa Batas'],
    uptimeKumaMonitorId: 3,
    uptimeKumaKeywords: ['stirling', 'pdf'],
    isQuickAction: true,
    featured: true
  },
  {
    id: 'crafty',
    name: 'Minecraft (Crafty Controller)',
    description: 'Panel kontrol dan server Minecraft keluarga. Buka dasbor Crafty atau salin alamat untuk langsung bermain.',
    url: 'https://crafty.kubiko.my.id',
    subdomain: 'crafty.kubiko.my.id',
    category: 'game',
    icon: 'Gamepad2',
    tag: 'Java & Bedrock • Survival',
    specs: ['Crafty Controller', 'Survival Server', 'Low Ping LAN/Mesh'],
    uptimeKumaMonitorId: 4,
    uptimeKumaKeywords: ['crafty', 'minecraft', 'mc'],
    copyText: 'crafty.kubiko.my.id',
    featured: true
  },
  {
    id: 'game-hub',
    name: 'Zona Game Keluarga',
    description: 'Direktori khusus untuk layanan game mandiri keluarga yang disiapkan pada subdomain terpisah.',
    url: 'https://game.kubiko.my.id',
    subdomain: 'game.kubiko.my.id',
    category: 'game',
    icon: 'Dices',
    tag: 'Browser Arcade • Multiplayer',
    specs: ['Subdomain Game', 'Ruang Ekspansi', 'Web Arcade'],
    uptimeKumaMonitorId: 5,
    uptimeKumaKeywords: ['game', 'arcade'],
    isUpcoming: true
  },
  {
    id: 'uptime-kuma',
    name: 'Uptime Kuma SLA Monitor',
    description: 'Laporan kesehatan sistem menyeluruh, statistik ketersediaan layanan 24/7, dan pemantauan latensi jaringan.',
    url: 'https://status.kubiko.my.id',
    subdomain: 'status.kubiko.my.id',
    category: 'utility',
    icon: 'Activity',
    tag: 'Health Check • 24/7 SLA',
    specs: ['SLA Monitor', 'Heartbeat Live', 'Incident History'],
    uptimeKumaMonitorId: 6,
    uptimeKumaKeywords: ['kuma', 'status', 'uptime']
  }
];

export const caddyProxyChain: CaddyRoute[] = [
  { from: 'kubiko.my.id', target: 'Portal Statis (Astro SSG)', port: 'HTTPS', note: 'Edge Web' },
  { from: 'nonton.kubiko.my.id', target: 'Jellyfin Media Server', port: ':8096', note: 'Tailscale' },
  { from: 'files.kubiko.my.id', target: 'Nextcloud Cloud Drive', port: ':8081', note: 'Tailscale' },
  { from: 'pdf.kubiko.my.id', target: 'Stirling PDF Tools', port: ':8080', note: 'Tailscale' },
  { from: 'crafty.kubiko.my.id', target: 'Crafty Minecraft Controller', port: ':8443', note: 'Tailscale' },
  { from: 'game.kubiko.my.id', target: 'Zona Game Web', port: ':3002', note: 'Tailscale' },
  { from: 'status.kubiko.my.id', target: 'Uptime Kuma SLA Monitor', port: ':3001', note: 'Tailscale' },
];

export const siteConfig = {
  domain: 'kubiko.my.id',
  siteName: 'Kubiko Portal',
  tagline: 'Pusat Hiburan & Utilitas Keluarga',
  description: 'Portal statis & direktori terpadu layanan mandiri keluarga (Self-hosted Family Cloud). Akses cepat media, utilitas, game server, dan status jaringan.',
  author: 'Keluarga Kubiko',
  statusPageUrl: 'https://status.kubiko.my.id',
  statusPageSlugs: ['family', 'kubiko', 'default'],
  network: {
    edgeNode: {
      name: 'VPS Singapore',
      ipOrHost: '160.19.166.23',
      status: 'Online',
      role: 'Caddy Edge Reverse Proxy',
      specs: '1 vCPU / 1 GB RAM'
    },
    tunnel: {
      name: 'Tailscale Mesh',
      status: 'Active',
      type: 'WireGuard Mesh Network',
      targetIp: '100.96.87.92',
      cgnatBypass: '100% CGNAT Bypassed'
    },
    homeNode: {
      name: 'Home Server Node',
      status: 'Connected',
      location: 'Local Rack Behind CGNAT',
      heartbeat: 'Synchronized'
    }
  }
};
