/**
 * Performance monitoring hook
 * Tracks component render times and performance metrics
 */

import { useEffect, useRef } from 'react';

export function usePerformance(componentName: string) {
  const renderStartTime = useRef<number>(performance.now());
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
    const renderTime = performance.now() - renderStartTime.current;

    // Only log in development and only for significantly slow renders (>100ms)
    // This reduces noise from normal React renders
    if (import.meta.env.DEV && renderTime > 100) {
      // Warn if render takes longer than 100ms (significantly slow)
      console.warn(
        `[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (render #${renderCount.current})`
      );
    }

    renderStartTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
  };
}

/**
 * Hook to measure async operation performance
 */
export function useAsyncPerformance(operationName: string) {
  const startTime = useRef<number | null>(null);

  const start = () => {
    startTime.current = performance.now();
  };

  const end = () => {
    if (startTime.current === null) return;
    const duration = performance.now() - startTime.current;
    
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${operationName} took ${duration.toFixed(2)}ms`);
    }
    
    startTime.current = null;
    return duration;
  };

  return { start, end };
}
