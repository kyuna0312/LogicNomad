/**
 * Lazy Loading Utilities
 * Optimized lazy loading helpers for better code splitting
 */

import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Create a lazy-loaded component with error boundary support
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      // In development, provide better error messages
      if (import.meta.env.DEV) {
        console.error('[Lazy Loading Error]:', error);
      }
      throw error;
    }
  });
}

/**
 * Preload a lazy component (useful for prefetching)
 */
export function preloadLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): Promise<void> {
  return importFn().then(() => {
    // Component loaded, ready to use
  });
}

/**
 * Lazy load with retry logic
 */
export function createLazyComponentWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  maxRetries = 3
): LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        if (import.meta.env.DEV) {
          console.warn(`[Lazy Loading] Attempt ${attempt}/${maxRetries} failed:`, error);
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    throw lastError || new Error('Failed to load component after retries');
  });
}
