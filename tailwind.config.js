/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        anthracite: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
        },
        neon: {
          green: '#39FF14',
          blue: '#00F3FF',
          pink: '#FF00E5',
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(57, 255, 20, 0.5)',
        'neon-glow-blue': '0 0 20px rgba(0, 243, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
