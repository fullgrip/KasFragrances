/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KAS Brand Colors - Artisan Luxury
        kas: {
          cream: '#FAF8F5',
          sand: '#F5F0E8',
          gold: '#C9A962',
          copper: '#B87333',
          charcoal: '#2C2C2C',
          slate: '#4A4A4A',
          blush: '#E8D4C8',
          sage: '#8B9A7E',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Nunito Sans', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
