/**
 * Analytics utility - Track user interactions and performance
 * Lightweight, privacy-friendly analytics
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private maxEvents = 100; // Keep last 100 events in memory

  track(eventName: string, properties?: Record<string, any>) {
    if (!import.meta.env.DEV) {
      // In production, send to analytics service
      // Example: gtag('event', eventName, properties);
      return;
    }

    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(event);
    
    // Keep only last N events
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    console.log('[Analytics]', event);
  }

  // Track page views
  pageView(pageName: string) {
    this.track('page_view', { page: pageName });
  }

  // Track level completion
  levelComplete(levelId: string, stepCount: number, isOptimal: boolean) {
    this.track('level_complete', {
      levelId,
      stepCount,
      isOptimal,
    });
  }

  // Track algorithm execution
  algorithmExecute(levelId: string, success: boolean, stepCount: number) {
    this.track('algorithm_execute', {
      levelId,
      success,
      stepCount,
    });
  }

  // Get events (for debugging)
  getEvents() {
    return [...this.events];
  }

  // Clear events
  clear() {
    this.events = [];
  }
}

export const analytics = new Analytics();
