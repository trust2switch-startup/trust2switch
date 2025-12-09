// Centralized Theme Configuration
// All colors, fonts, spacing, and design tokens are defined here

export const theme = {
  colors: {
    primary: {
      50: '#f5f7f0',
      100: '#e8eed8',
      200: '#d1ddb1',
      300: '#b4c885',
      400: '#9ab05f',
      500: '#84994f', // Main primary color
      600: '#6d7f42',
      700: '#576537',
      800: '#46502d',
      900: '#3a4225',
    },
    secondary: {
      50: '#f0f3f5',
      100: '#d9e1e5',
      200: '#b8c7ce',
      300: '#8fa5b0',
      400: '#6a8391',
      500: '#556a77',
      600: '#435663', // Main secondary color
      700: '#384752',
      800: '#313c45',
      900: '#2b343a',
    },
    accent: {
      50: '#fef4f0',
      100: '#fde6d8',
      200: '#fbcbb0',
      300: '#f8a77d',
      400: '#f47a4a',
      500: '#d97757', // Warm terracotta accent
      600: '#c46247',
      700: '#a04d3a',
      800: '#824030',
      900: '#6b3528',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Poppins', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

export type Theme = typeof theme;


