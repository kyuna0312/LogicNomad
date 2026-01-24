import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * LeetCode-inspired professional theme for LogicNomad
 * Clean, minimal design matching LeetCode's exact color scheme
 */
export const theme = createSystem(
  defineConfig({
    theme: {
      tokens: {
        colors: {
          // LeetCode Primary Blue
          primary: {
            50: { value: '#e3f2fd' },
            100: { value: '#bbdefb' },
            200: { value: '#90caf9' },
            300: { value: '#64b5f6' },
            400: { value: '#42a5f5' },
            500: { value: '#1a73e8' }, // LeetCode blue
            600: { value: '#1967d2' },
            700: { value: '#185abc' },
            800: { value: '#174ea6' },
            900: { value: '#1539b0' },
          },
          // LeetCode Success Green
          success: {
            50: { value: '#e8f5e9' },
            100: { value: '#c8e6c9' },
            200: { value: '#a5d6a7' },
            300: { value: '#81c784' },
            400: { value: '#66bb6a' },
            500: { value: '#5cb85c' }, // LeetCode green
            600: { value: '#4caf50' },
            700: { value: '#43a047' },
            800: { value: '#388e3c' },
            900: { value: '#2e7d32' },
          },
          // LeetCode Dark Backgrounds
          dark: {
            50: { value: '#3a3a3a' },
            100: { value: '#2d2d2d' },  // Card background
            200: { value: '#1e1e1e' },  // Main background (LeetCode dark)
            300: { value: '#181818' },  // Darker
            400: { value: '#141414' },
            500: { value: '#0f0f0f' },
          },
          // Gray scale for text and borders
          gray: {
            50: { value: '#fafafa' },
            100: { value: '#f5f5f5' },
            200: { value: '#eeeeee' },
            300: { value: '#e0e0e0' },
            400: { value: '#bdbdbd' },
            500: { value: '#9e9e9e' },
            600: { value: '#757575' },
            700: { value: '#616161' },
            800: { value: '#424242' },
            900: { value: '#212121' },
          },
          // Warning/Medium difficulty (LeetCode orange)
          warning: {
            500: { value: '#ffa116' }, // LeetCode orange
            600: { value: '#ff9800' },
          },
          // Danger/Hard difficulty (LeetCode red)
          danger: {
            500: { value: '#ef4743' }, // LeetCode red
            600: { value: '#d32f2f' },
          },
        },
      },
      semanticTokens: {
        colors: {
          'bg-primary': { value: '{colors.dark.200}' },
          'bg-secondary': { value: '{colors.dark.100}' },
          'bg-tertiary': { value: '{colors.dark.300}' },
          'text-primary': { value: '#ffffff' },
          'text-secondary': { value: '#a0a0a0' }, // LeetCode text secondary
          'text-muted': { value: '#888888' },
          'text-accent': { value: '{colors.primary.500}' },
          'border-primary': { value: '#3a3a3a' }, // LeetCode border
          'border-secondary': { value: '#2d2d2d' },
          'success': { value: '{colors.success.500}' },
        },
        shadows: {
          'card': { value: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)' },
          'card-hover': { value: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' },
          'success': { value: '0 0 0 2px rgba(76, 175, 80, 0.2)' },
        },
      },
    },
  }),
  defaultConfig
);
