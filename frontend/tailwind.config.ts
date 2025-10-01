import type { Config } from 'tailwindcss';

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#ebf0ff',
          200: '#cfd9ff',
          300: '#a6baff',
          400: '#6f8cff',
          500: '#3d5afe',
          600: '#2a44d7',
          700: '#2137ad',
          800: '#1d318c',
          900: '#1c2d74'
        }
      }
    }
  },
  plugins: []
} satisfies Config;


