/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // slate-200
        ring: 'var(--color-ring)', // blue-600
        background: 'var(--color-background)', // warm-white
        foreground: 'var(--color-foreground)', // slate-800
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-600
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // emerald-500
          foreground: 'var(--color-accent-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-600
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-50
          foreground: 'var(--color-muted-foreground)', // slate-500
        },
        card: {
          DEFAULT: 'var(--color-card)', // slate-50
          foreground: 'var(--color-card-foreground)', // slate-800
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // slate-800
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'heading-1': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-3': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-4': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-default': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'nav': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      spacing: {
        'sidebar': '240px',
        'sidebar-collapsed': '64px',
      },
      zIndex: {
        'sidebar': '100',
        'mobile-menu': '200',
        'dropdown': '300',
        'modal': '400',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'hover': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'active': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'default': '200ms',
        'layout': '300ms',
      },
      keyframes: {
        'progress-ring': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'check-mark': {
          '0%': { strokeDashoffset: '50' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'progress-ring': 'progress-ring 1s ease-out forwards',
        'check-mark': 'check-mark 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}