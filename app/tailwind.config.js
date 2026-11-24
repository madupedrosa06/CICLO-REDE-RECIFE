/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        creme: '#FBF5E9',
        azul: '#1F4E8C',      // azul colonial
        azulejo: '#2C5DA8',
        ocre: '#D9A13B',      // amarelo ocre
        rosa: '#D9707E',
        agua: '#4FA3A0',      // verde água
        terracota: '#B5532F',
        tinta: '#1E2430'
      },
      fontFamily: {
        titulo: ['"Playfair Display"', 'Georgia', 'serif'],
        corpo: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
