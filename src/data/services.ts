import type { ServiceItem } from '../types/service';

export const servicesData: ServiceItem[] = [
  {
    id: 'jellyfin',
    name: 'Jellyfin Media',
    description: 'Streaming film, serial TV, dan musik keluarga kualitas tinggi tanpa jeda iklan.',
    url: 'https://jellyfin.kubiko.my.id',
    category: 'media',
    icon: 'Film',
    tag: '4K HDR • Streaming',
    uptimeKumaMonitorId: 1,
    isQuickAction: true,
    featured: true
  },
  {
    id: 'stirling-pdf',
    name: 'Stirling PDF',
    description: 'Utilitas lengkap PDF: gabung, pisah, kompres, konversi format, dan OCR tanpa batas berkas.',
    url: 'https://pdf.kubiko.my.id',
    category: 'utility',
    icon: 'FileText',
    tag: 'PDF Tools • No Upload Limit',
    uptimeKumaMonitorId: 2,
    isQuickAction: true,
    featured: true
  },
  {
    id: 'minecraft',
    name: 'Minecraft Server',
    description: 'Dunia survival multiplayer keluarga dan teman dengan performa stabil & low ping.',
    url: 'https://mc.kubiko.my.id',
    category: 'game',
    icon: 'Gamepad2',
    tag: 'Survival • 1.21.x Java/Bedrock',
    copyText: 'mc.kubiko.my.id:25565',
    uptimeKumaMonitorId: 3,
    featured: true
  },
  {
    id: 'web-games',
    name: 'Web Mini Games',
    description: 'Koleksi arcade & puzzle web ringan yang dapat dimainkan langsung dari peramban keluarga.',
    url: 'https://games.kubiko.my.id',
    category: 'game',
    icon: 'Dices',
    tag: 'Arcade • Web Browser',
    uptimeKumaMonitorId: 4
  },
  {
    id: 'file-vault',
    name: 'Home Cloud Storage',
    description: 'Penyimpanan berkas aman pribadi untuk backup foto, dokumen, dan data penting keluarga.',
    url: 'https://cloud.kubiko.my.id',
    category: 'utility',
    icon: 'HardDrive',
    tag: 'Private Cloud • Encrypted',
    uptimeKumaMonitorId: 5
  },
  {
    id: 'uptime-kuma',
    name: 'Uptime Kuma Status',
    description: 'Laporan kesehatan sistem menyeluruh, statistik ketersediaan layanan, dan pemantauan latensi.',
    url: 'https://status.kubiko.my.id',
    category: 'utility',
    icon: 'Activity',
    tag: 'Health Check • Real-time SLA',
    uptimeKumaMonitorId: 6
  }
];

export const siteConfig = {
  domain: 'kubiko.my.id',
  siteName: 'Kubiko Portal',
  tagline: 'Pusat Hiburan & Utilitas Keluarga',
  description: 'Portal statis & direktori terpadu layanan mandiri keluarga (Self-hosted Family Cloud). Akses cepat media, utilitas, game server, dan status jaringan.',
  author: 'Keluarga Kubiko',
  statusPageUrl: 'https://status.kubiko.my.id',
  uptimeKumaApiEndpoint: '/api/status-page/heartbeat/family',
  fallbackStatusJson: '/mock-status.json',
  network: {
    edgeNode: {
      name: 'VPS Singapore',
      ipOrHost: 'edge-sg01.kubiko.my.id',
      status: 'Online',
      role: 'Caddy Edge Reverse Proxy',
      specs: '1 vCPU / 1 GB RAM'
    },
    tunnel: {
      name: 'Tailscale Mesh',
      status: 'Active',
      type: 'WireGuard Mesh Network',
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
