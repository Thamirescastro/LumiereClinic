/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumiere: {
          gold: '#D4AF37',       // Dourado Nobre
          goldLight: '#F3E5AB',  // Toque de seda
          cream: '#FDFBF7',      // Fundo Clean Luxo
          dark: '#111111',       // Preto Elegante
          stone: '#1F2937'
        }
      },
      fontFamily: {
        sans: ['Cormorant Garamond', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}