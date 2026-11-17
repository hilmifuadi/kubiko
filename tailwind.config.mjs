/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          sand: '#F2EFE9',
          border: '#E6E2D8',
          'border-hover': '#D1CCC0',
          charcoal: '#1C1B18',
          muted: '#6E6A61',
          accent: '#3D6B58',
          'accent-hover': '#325747',
          terracotta: '#C86D51',
          'terracotta-hover': '#B25B40'
        },
        status: {
          online: '#10B981',
          offline: '#EF4444',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(28, 27, 24, 0.04), 0 1px 2px -1px rgba(28, 27, 24, 0.04)',
        'card': '0 4px 6px -1px rgba(28, 27, 24, 0.05), 0 2px 4px -2px rgba(28, 27, 24, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(28, 27, 24, 0.08), 0 4px 6px -4px rgba(28, 27, 24, 0.04)'
      }
    },
  },
  plugins: [],
};
