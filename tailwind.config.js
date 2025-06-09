/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        'primary-dark': '#0A1931',
        'secondary-dark': '#185ADB',
        'accent-dark': '#FF2E63',
        'text-dark': '#F1F1F1',
        'background-dark': '#0F172A',
        'surface-dark': '#1E293B',
        
        // Light Mode Colors
        'primary-light': '#3B82F6',
        'secondary-light': '#8B5CF6',
        'accent-light': '#EC4899',
        'text-light': '#0F172A',
        'background-light': '#F8FAFC',
        'surface-light': '#FFFFFF',
        
        // Status Colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 46, 99, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 46, 99, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};