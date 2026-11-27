/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#FAF7F0',
          surface: '#FFFFFF',
          sand: '#F2ECE1',
          border: '#E2D9CC',
          'border-hover': '#C8BEAF',
          charcoal: '#161513',
          muted: '#666159',
          accent: '#161513',
          'accent-hover': '#2C2A26',
          terracotta: '#DE5D35',
          'terracotta-hover': '#C64E29',
          yellow: '#EAA838',
          'yellow-hover': '#D99625',
          'yellow-light': '#FDE8BE',
        },
        editorial: {
          bg: '#FAF7F0',
          surface: '#FFFFFF',
          sand: '#F2ECE1',
          dark: '#161513',
          darker: '#0F0E0D',
          muted: '#6B655D',
          border: '#161513',
          'border-light': '#E2D9CC',
          yellow: '#EAA838',
          'yellow-hover': '#D99625',
          terracotta: '#DE5D35',
          'terracotta-hover': '#C64E29',
          cream: '#FFFDF9',
        },
        status: {
          online: '#10B981',
          offline: '#EF4444',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(22, 21, 19, 0.05), 0 1px 2px -1px rgba(22, 21, 19, 0.05)',
        'card': '0 4px 6px -1px rgba(22, 21, 19, 0.05), 0 2px 4px -2px rgba(22, 21, 19, 0.05)',
        'card-hover': '0 12px 20px -3px rgba(22, 21, 19, 0.09), 0 4px 6px -4px rgba(22, 21, 19, 0.05)',
        'brutal-sm': '2px 2px 0px 0px #161513',
        'brutal': '3px 3px 0px 0px #161513',
        'brutal-lg': '5px 5px 0px 0px #161513',
        'brutal-yellow': '4px 4px 0px 0px #EAA838',
        'brutal-terracotta': '4px 4px 0px 0px #DE5D35',
      }
    },
  },
  plugins: [],
};
