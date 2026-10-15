/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4efe2',
        charcoal: '#2c2c2a',
        inkred: '#732015',
        faded: '#d9d0bd'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Merriweather', 'Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace']
      }
    }
  },
  plugins: []
};
