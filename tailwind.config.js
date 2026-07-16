/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D1A', ink2: '#1E1C38', ink3: '#5A587A',
        paper: '#FAFAF5', paper2: '#F2F1E8', paper3: '#E5E3D5',
        plum: '#42188C', 'plum-l': '#7040C8', 'plum-p': '#EDE8FA',
        teal: '#0A7050', 'teal-l': '#10A878', 'teal-p': '#E0F5EE',
        gold: '#B8860A', 'gold-l': '#F0C030', 'gold-p': '#FEF6D8',
        coral: '#B83008', 'coral-p': '#FAE8E0',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(13,13,26,.07)',
        card2: '0 8px 48px rgba(13,13,26,.13)',
      },
    },
  },
  plugins: [],
}