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
        terraria: {
          armor: '#3b82f6',
          weapon: '#ef4444',
          tool: '#10b981',
          station: '#8b5cf6',
        }
      }
    },
  },
  plugins: [],
}
