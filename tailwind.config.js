/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enhanced Dark Mode Colors (Psychological: Trust, Security, Focus)
        'primary-dark': '#0B1426',      // Deep navy - trust, security
        'secondary-dark': '#1E40AF',    // Royal blue - reliability, professionalism
        'accent-dark': '#3B82F6',       // Bright blue - action, clarity
        'success-dark': '#059669',      // Emerald - success, growth
        'warning-dark': '#D97706',      // Amber - attention, caution
        'error-dark': '#DC2626',        // Red - urgency, danger
        'text-dark': '#F8FAFC',         // Almost white - readability
        'text-secondary-dark': '#CBD5E1', // Light gray - secondary text
        'background-dark': '#0F172A',   // Very dark blue - reduces eye strain
        'surface-dark': '#1E293B',      // Dark slate - content areas
        'surface-secondary-dark': '#334155', // Medium slate - elevated content
        
        // Enhanced Light Mode Colors (Psychological: Energy, Clarity, Productivity)
        'primary-light': '#FFFFFF',     // Pure white - cleanliness, clarity
        'secondary-light': '#2563EB',   // Blue - trust, productivity
        'accent-light': '#3B82F6',      // Bright blue - action, engagement
        'success-light': '#10B981',     // Green - success, positive action
        'warning-light': '#F59E0B',     // Yellow - attention, optimism
        'error-light': '#EF4444',       // Red - urgency, importance
        'text-light': '#0F172A',        // Dark navy - high contrast
        'text-secondary-light': '#64748B', // Gray - secondary text
        'background-light': '#F8FAFC',  // Off-white - reduces glare
        'surface-light': '#FFFFFF',     // Pure white - content areas
        'surface-secondary-light': '#F1F5F9', // Light gray - elevated content
        
        // Semantic Colors (Universal psychological impact)
        'info': '#0EA5E9',              // Sky blue - information, calm
        'neutral': '#6B7280',           // Gray - balance, neutrality
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'glass-float': 'glassFloat 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glassFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '70': '17.5rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
        'dark-glow': '0 0 30px rgba(219, 39, 119, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-border': '0 0 0 1px rgba(255, 255, 255, 0.05)',
        'neumorphism-dark': '20px 20px 60px #0a0f1c, -20px -20px 60px #1a2332',
        'neumorphism-dark-inset': 'inset 20px 20px 60px #0a0f1c, inset -20px -20px 60px #1a2332',
        'neumorphism-light': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neumorphism-light-inset': 'inset 20px 20px 60px #d1d9e6, inset -20px -20px 60px #ffffff',
        'soft-dark': '0 10px 30px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.2)',
        'soft-light': '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'glass-gradient-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        'dark-gradient': 'linear-gradient(135deg, rgba(219, 39, 119, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        'dark-mesh': 'radial-gradient(circle at 20% 80%, rgba(219, 39, 119, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
        'neumorphism-bg': 'linear-gradient(145deg, #1e293b, #0f172a)',
      },
    },
  },
  plugins: [],
};