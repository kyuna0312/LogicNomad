/**
 * Chakra UI Optimization Utilities
 * Performance optimizations and best practices for Chakra UI
 */

import { useMemo } from 'react';

/**
 * Memoize responsive values to prevent unnecessary recalculations
 */
export function useResponsiveValue<T>(
  value: T | Record<string, T>
): T | Record<string, T> {
  return useMemo(() => value, [JSON.stringify(value)]);
}

/**
 * Optimize breakpoint values - memoize common breakpoint patterns
 */
export const breakpointValues = {
  // Common responsive patterns
  spacing: {
    xs: { base: 2, md: 4, lg: 6 },
    sm: { base: 4, md: 6, lg: 8 },
    md: { base: 6, md: 8, lg: 10 },
    lg: { base: 8, md: 10, lg: 12 },
  },
  fontSize: {
    xs: { base: 'xs', md: 'sm' },
    sm: { base: 'sm', md: 'md' },
    md: { base: 'md', md: 'lg' },
    lg: { base: 'lg', md: 'xl' },
    xl: { base: 'xl', md: '2xl' },
  },
  container: {
    sm: { base: '100%', sm: '540px', md: '720px' },
    md: { base: '100%', sm: '720px', md: '960px' },
    lg: { base: '100%', md: '960px', lg: '1140px' },
    xl: { base: '100%', md: '1140px', lg: '1320px' },
  },
} as const;

/**
 * Get optimized responsive value
 */
export function getResponsive<T>(
  category: keyof typeof breakpointValues,
  size: keyof typeof breakpointValues[typeof category]
): T | Record<string, T> {
  return breakpointValues[category][size] as T | Record<string, T>;
}

/**
 * Common Chakra UI prop patterns for performance
 */
export const chakraProps = {
  // Common transition props
  transition: {
    fast: 'all 0.15s ease-out',
    normal: 'all 0.2s ease-out',
    slow: 'all 0.3s ease-out',
  },
  // Common shadow props
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 2px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.4)',
  },
  // Common border radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
} as const;
