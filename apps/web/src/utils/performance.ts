/**
 * Performance monitoring utilities
 */

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private readonly maxMetrics = 100;
  private readonly slowRenderThreshold = 16; // 60fps = 16ms per frame

  /**
   * Measure component render time
   */
  measureRender(componentName: string, renderFn: () => void): void {
    if (!import.meta.env.DEV) {
      renderFn();
      return;
    }

    const start = performance.now();
    renderFn();
    const end = performance.now();
    const renderTime = end - start;

    this.recordMetric({
      componentName,
      renderTime,
      timestamp: Date.now(),
    });

    if (renderTime > this.slowRenderThreshold) {
      console.warn(
        `[Performance] Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms (threshold: ${this.slowRenderThreshold}ms)`,
      );
    }
  }

  /**
   * Record a performance metric
   */
  private recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  /**
   * Get average render time for a component
   */
  getAverageRenderTime(componentName: string): number {
    const componentMetrics = this.metrics.filter(
      (m) => m.componentName === componentName,
    );
    if (componentMetrics.length === 0) return 0;

    const sum = componentMetrics.reduce((acc, m) => acc + m.renderTime, 0);
    return sum / componentMetrics.length;
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Get performance report
   */
  getReport(): {
    totalRenders: number;
    slowRenders: number;
    averageRenderTime: number;
    componentStats: Record<string, { count: number; average: number }>;
  } {
    const slowRenders = this.metrics.filter(
      (m) => m.renderTime > this.slowRenderThreshold,
    ).length;

    const averageRenderTime =
      this.metrics.length > 0
        ? this.metrics.reduce((acc, m) => acc + m.renderTime, 0) /
          this.metrics.length
        : 0;

    const componentStats: Record<string, { count: number; average: number }> =
      {};
    this.metrics.forEach((m) => {
      if (!componentStats[m.componentName]) {
        componentStats[m.componentName] = { count: 0, average: 0 };
      }
      componentStats[m.componentName].count++;
    });

    Object.keys(componentStats).forEach((name) => {
      componentStats[name].average = this.getAverageRenderTime(name);
    });

    return {
      totalRenders: this.metrics.length,
      slowRenders,
      averageRenderTime,
      componentStats,
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor(_componentName: string): void {
  if (!import.meta.env.DEV) return;

  // Log performance report on unmount
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      const report = performanceMonitor.getReport();
      if (report.totalRenders > 0) {
        console.log('[Performance Report]', report);
      }
    });
  }
}
