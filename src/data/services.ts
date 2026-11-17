import type { ServiceItem, CaddyRoute } from '../types/service';

export const servicesData: ServiceItem[] = [
  {
    id: 'jellyfin',
    name: 'Nonton Film & Video',
    description: 'Koleksi film, serial, dan animasi keluarga untuk ditonton bersama sepuasnya tanpa iklan.',
    url: 'https://nonton.kubiko.my.id',
    subdomain: 'nonton.kubiko.my.id',
    category: 'media',
    icon: 'Film',
    tag: 'Tontonan Keluarga',
    specs: ['Bisa di HP, Tablet & TV', 'Bebas Iklan'],
    uptimeKumaMonitorId: 1,
    uptimeKumaKeywords: ['jellyfin', 'nonton', 'media'],
    isQuickAction: true,
    featured: true
  },
  {
    id: 'nextcloud',
    name: 'Penyimpanan Berkas',
    description: 'Tempat aman menyimpan foto liburan, dokumen penting, dan berbagi berkas antar anggota keluarga.',
    url: 'https://files.kubiko.my.id',
    subdomain: 'files.kubiko.my.id',
    category: 'utility',
    icon: 'HardDrive',
    tag: 'Cloud Pribadi',
    specs: ['Cadangan Foto HP', 'Aman & Pribadi'],
    uptimeKumaMonitorId: 2,
    uptimeKumaKeywords: ['nextcloud', 'files', 'cloud'],
    featured: true
  },
  {
    id: 'stirling-pdf',
    name: 'Pengolah PDF',
    description: 'Gabungkan file PDF, pisahkan halaman, perkecil ukuran dokumen, atau ubah format dengan mudah.',
    url: 'https://pdf.kubiko.my.id',
    subdomain: 'pdf.kubiko.my.id',
    category: 'utility',
    icon: 'FileText',
    tag: 'Alat Dokumen',
    specs: ['Praktis & Cepat', 'Gratis Tanpa Batas'],
    uptimeKumaMonitorId: 3,
    uptimeKumaKeywords: ['stirling', 'pdf'],
    isQuickAction: true,
    featured: true
  },
  {
    id: 'crafty',
    name: 'Server Minecraft',
    description: 'Dunia petualangan survival untuk bermain Minecraft bersama seluruh anggota keluarga dan teman.',
    url: 'https://crafty.kubiko.my.id',
    subdomain: 'crafty.kubiko.my.id',
    category: 'game',
    icon: 'Gamepad2',
    tag: 'Main Bareng',
    specs: ['Bisa Java & Bedrock', 'Tersedia 24 Jam'],
    uptimeKumaMonitorId: 4,
    uptimeKumaKeywords: ['crafty', 'minecraft', 'mc'],
    copyText: 'crafty.kubiko.my.id',
    featured: true
  },
  {
    id: 'game-hub',
    name: 'Zona Game Santai',
    description: 'Kumpulan game santai ringan yang bisa langsung dimainkan bersama lewat peramban web.',
    url: 'https://game.kubiko.my.id',
    subdomain: 'game.kubiko.my.id',
    category: 'game',
    icon: 'Dices',
    tag: 'Game Web',
    specs: ['Buka Langsung di Browser'],
    uptimeKumaMonitorId: 5,
    uptimeKumaKeywords: ['game', 'arcade'],
    isUpcoming: true
  }
];

export const caddyProxyChain: CaddyRoute[] = [
  { from: 'nonton.kubiko.my.id', target: 'Nonton Film (Jellyfin)', port: ':8096', note: 'Bebas Iklan' },
  { from: 'files.kubiko.my.id', target: 'Penyimpanan Foto & Dokumen (Nextcloud)', port: ':8443', note: 'Aman' },
  { from: 'pdf.kubiko.my.id', target: 'Alat Pengolah PDF (Stirling)', port: ':8889', note: 'Praktis' },
  { from: 'crafty.kubiko.my.id', target: 'Server Game Minecraft', port: ':8443', note: 'Survival' },
  { from: 'game.kubiko.my.id', target: 'Zona Game Santai', port: ':3002', note: 'Di Browser' },
];

export const siteConfig = {
  domain: 'kubiko.my.id',
  siteName: 'Kubiko Portal',
  tagline: 'Pusat Hiburan & Utilitas Keluarga',
  description: 'Portal akses cepat layanan mandiri keluarga: nonton film, simpan foto, olah dokumen PDF, dan main game santai bersama.',
  author: 'Keluarga Kubiko',
  statusPageUrl: 'https://status.kubiko.my.id',
  statusPageSlugs: ['family', 'kubiko', 'default'],
  network: {
    edgeNode: {
      name: 'Cloud VPS',
      ipOrHost: '160.19.166.23',
      status: 'Online',
      role: 'Gerbang Web & SSL Aman',
      specs: 'Edge Reverse Proxy'
    },
    tunnel: {
      name: 'Jalur Privat (Tailscale)',
      status: 'Active',
      type: 'Koneksi Terenkripsi Aman',
      targetIp: '100.96.87.92',
      cgnatBypass: 'Jalur Langsung ke Rumah'
    },
    homeNode: {
      name: 'Server Rumah',
      status: 'Connected',
      location: 'Pusat Layanan di Rumah',
      heartbeat: 'Siaga'
    }
  }
};
