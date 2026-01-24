/**
 * Design Tokens - Centralized design system values
 * HackerRank-inspired professional theme
 */

export const designTokens = {
  // Colors - Professional HackerRank Style
  colors: {
    primary: {
      50: '#e6f2ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0073e6', // Main primary blue
      600: '#005cb3',
      700: '#004580',
      800: '#002e4d',
      900: '#00171a',
    },
    success: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#5cb85c', // HackerRank success green
      600: '#4caf50',
      700: '#43a047',
      800: '#388e3c',
      900: '#2e7d32',
    },
    warning: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#f0ad4e', // Medium difficulty
      600: '#ec971f',
      700: '#d68910',
      800: '#c1770f',
      900: '#a9650d',
    },
    danger: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#d9534f', // Hard difficulty
      600: '#c9302c',
      700: '#c62828',
      800: '#b71c1c',
      900: '#a01212',
    },
    dark: {
      50: '#2d2d2d',   // Lighter dark
      100: '#232323',  // Main dark
      200: '#1e1e1e',  // Darker
      300: '#1a1a1a',  // Darkest
      400: '#151515',
      500: '#0f0f0f',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    text: {
      primary: '#e8e8e8',
      secondary: '#b0b0b0',
      tertiary: '#888888',
      inverse: '#1a1a1a',
    },
    border: {
      primary: '#3a3a3a',
      secondary: '#4a4a4a',
      accent: '#5cb85c',
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  // Border Radius - Professional
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows - Professional
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 2px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.4)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.5)',
    card: '0 2px 8px rgba(0, 0, 0, 0.3)',
    'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
    success: '0 0 8px rgba(92, 184, 92, 0.3)',
    primary: '0 0 8px rgba(0, 115, 230, 0.3)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease-out',
    normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s ease-in-out',
    bounce: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Z-Index
  zIndex: {
    base: 1,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
  },

  // Breakpoints
  breakpoints: {
    sm: '30em',   // 480px
    md: '48em',   // 768px
    lg: '62em',   // 992px
    xl: '80em',   // 1280px
    '2xl': '96em', // 1536px
  },

  // Typography
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',   // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Animations
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
      slower: '1s',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
