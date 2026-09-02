/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#2e2b27', muted: '#5e5952', faint: '#8a847c' },
        paper: { DEFAULT: '#faf5ee', card: '#fffcf7' },
        rule: '#ebe4d8',
        accent: { DEFAULT: '#3f7d6c', hover: '#336657' },
      },
      maxWidth: { prose: '42rem', site: '68rem' },
      boxShadow: {
        card: '0 1px 2px rgba(46, 43, 39, 0.04), 0 4px 12px rgba(46, 43, 39, 0.04)',
      },
    },
  },
  plugins: [],
};
