/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        zinc: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          400: '#A1A1AA',
          200: '#E4E4E7',
          50:  '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'circuit': 'circuit 8s linear infinite',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        circuit: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220,38,38,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(220,38,38,0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { textShadow: '0 0 10px rgba(220,38,38,0.5)' },
          to: { textShadow: '0 0 30px rgba(220,38,38,0.9), 0 0 60px rgba(220,38,38,0.5)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
