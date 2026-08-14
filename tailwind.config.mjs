/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#d9e5f2',
          200: '#b4cfe5',
          300: '#84b0d3',
          400: '#528ec0',
          500: '#3272aa',
          600: '#23598d',
          700: '#1d4872',
          800: '#1a3d5f',
          900: '#0b192c',
          950: '#060e1a',
        },
        gold: {
          50: '#fdfbf2',
          100: '#faf4df',
          200: '#f4e7b8',
          300: '#ebd387',
          400: '#e0bb56',
          500: '#d4af37',
          600: '#b88d29',
          700: '#946a23',
          800: '#795423',
          900: '#674622',
        },
        whatsapp: {
          light: '#4ade80',
          DEFAULT: '#25D366',
          dark: '#128C7E',
          darker: '#075E54',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 25, 44, 0.08)',
        'premium': '0 20px 40px -15px rgba(11, 25, 44, 0.12)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'floating': '0 12px 30px rgba(37, 211, 102, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
