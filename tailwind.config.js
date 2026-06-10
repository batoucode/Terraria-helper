/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EDD8',
        parchment: '#E8D8B4',
        paper: '#FFFEF8',
        'brown-dk': '#3D2B1F',
        'brown-md': '#7B4F2E',
        'brown-lt': '#C4956A',
        'green-dk': '#2D5A3D',
        'green-md': '#4A7A50',
        'green-lt': '#8AB595',
        'craft-red': '#8B3A3A',
        'craft-ink': '#2A1A12',
        terraria: {
          armor: '#3b82f6',
          weapon: '#ef4444',
          tool: '#10b981',
          station: '#8b5cf6',
        },
      },
      fontFamily: {
        kalam: ['var(--font-kalam)', 'cursive'],
        caveat: ['var(--font-caveat)', 'cursive'],
        patrick: ['var(--font-patrick)', 'cursive'],
      },
    },
  },
  plugins: [],
}
