/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#12141a', muted: '#4a5060', faint: '#6b7280' },
        paper: { DEFAULT: '#f7f6f2', card: '#fffcf8' },
        rule: '#e4e2dc',
        accent: { DEFAULT: '#5c7a6a', hover: '#4a6556' },
      },
      maxWidth: { prose: '42rem', site: '68rem' },
    },
  },
  plugins: [],
};
