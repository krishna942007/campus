/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#FAF7F0',
          canvas: '#F3EBDD',
          muted: '#E8DDCB',
          card: '#FFFFFF',
        },
        vit: {
          midnight: '#082B4C',
          navy: '#061D33',
          blue: '#0066A8',
          accent: '#4D91B8',
          gold: '#C99A3D',
          goldLight: '#E2C06A',
          charcoal: '#1A232E',
          ivory: '#FAF7F0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(201, 154, 61, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(0, 102, 168, 0.3)',
        'warm-card': '0 10px 40px -10px rgba(8, 43, 76, 0.08), 0 0 1px 1px rgba(201, 154, 61, 0.15)',
      },
    },
  },
  plugins: [],
};
