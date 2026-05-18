/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#080810',
          2: '#0e0e18',
          3: '#141422',
        },
        surface: {
          DEFAULT: '#1c1c2e',
          2: '#24243a',
          3: '#2e2e48',
        },
        accent: {
          DEFAULT: '#ff3d7f',
          2: '#ff6b35',
        },
      },
      animation: {
        'pulse-bar': 'pulseBar 0.8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
