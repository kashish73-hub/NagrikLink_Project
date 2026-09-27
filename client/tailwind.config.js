/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0a192f',
          dark: '#0f233a',
          primary: '#133e68',
          accent: '#1e5488',
          light: '#f0f5fa',
          saffron: {
            DEFAULT: '#ff8c00',
            light: '#ffa940',
            dark: '#d46b08',
            tint: '#fff7e6'
          },
          emerald: {
            DEFAULT: '#059669',
            light: '#10b981',
            dark: '#047857',
            tint: '#ecfdf5'
          },
          gold: '#eab308'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 35, 58, 0.08)',
        'elevated': '0 20px 40px -15px rgba(19, 62, 104, 0.12)',
        'glow-saffron': '0 0 20px -3px rgba(255, 140, 0, 0.3)',
        'glow-emerald': '0 0 20px -3px rgba(5, 150, 105, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
};
