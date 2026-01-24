/**
 * Optimized Chakra UI Hooks
 * Performance-optimized hooks for Chakra UI
 */

import { useMemo } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

/**
 * Memoized breakpoint value hook
 * Prevents unnecessary recalculations on re-renders
 */
export function useBreakpointValueMemo<T>(values: Record<string, T>): T | undefined {
  const value = useBreakpointValue(values);
  return useMemo(() => value, [value]);
}

/**
 * Optimized responsive value hook
 * Memoizes the responsive value object
 */
export function useResponsive<T>(
  values: Record<string, T>
): T | undefined {
  const value = useBreakpointValue(values);
  // Memoize based on the actual value, not the object reference
  return useMemo(() => value, [JSON.stringify(value)]);
}

/**
 * Common responsive patterns
 */
export const useResponsiveSpacing = () => {
  return useMemo(() => ({
    xs: { base: 2, md: 4 },
    sm: { base: 4, md: 6 },
    md: { base: 6, md: 8 },
    lg: { base: 8, md: 10 },
    xl: { base: 10, md: 12 },
  }), []);
};

export const useResponsiveFontSize = () => {
  return useMemo(() => ({
    xs: { base: 'xs', md: 'sm' },
    sm: { base: 'sm', md: 'md' },
    md: { base: 'md', md: 'lg' },
    lg: { base: 'lg', md: 'xl' },
    xl: { base: 'xl', md: '2xl' },
  }), []);
};
